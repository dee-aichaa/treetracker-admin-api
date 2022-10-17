const csv = require('csvtojson');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const Batch = require('../models/Batch');
const Earnings = require('../models/Earnings');
const Session = require('../infra/database/Session');
const { uploadCsv } = require('./S3Service');
const HttpError = require('../utils/HttpError');

class EarningsService {
  constructor() {
    this._session = new Session();
    this._earnings = new Earnings(this._session);
  }

  async getEarnings(filter, limitOptions) {
    // console.log('In EarningsService.getEarnings');
    return this._earnings.getEarnings(filter, limitOptions);
  }

  async updateEarnings(requestBody) {
    try {
      await this._session.beginTransaction();
      const result = await this._earnings.updateEarnings(requestBody);
      await this._session.commitTransaction();
      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async updateBatchEarnings(file, validateRow, adminId) {
    const key = `treetracker_earnings/${new Date().toISOString()}_${uuid()}.csv`;
    const fileBuffer = await fs.promises.readFile(file.path);
    const csvReadStream = fs.createReadStream(file.path);

    // check the first line, headers of fields
    const firstLine = fileBuffer.toString().split('\n')[0];
    if (
      !firstLine.match(
        /.*earnings_id.*,.*worker_id.*,.*phone.*,.*currency.*,.*amount.*,.*captures_count.*,.*payment_confirmation_id.*,.*payment_method.*,.*paid_at.*/,
      )
    ) {
      throw new HttpError(
        422,
        'Seems the CSV file is not in the correct format, make sure the CSV file has fields: "earnings_id", "worker_id", "phone", "currency", "amount", "captures_count", "payment_confirmation_id", "payment_method", "paid_at", and the fields is separated by a comma',
      );
    }

    // Don't want to roll back batch creation if it errors out
    const batchSession = new Session();
    const batch = new Batch(batchSession);
    let batchId = '';
    try {
      const batchUpdateEarnings = (batch_id) => {
        let count = 0;

        return new Promise((resolve, reject) => {
          csv()
            .fromStream(csvReadStream)
            .subscribe(
              async (row) => {
                const json = await validateRow(row);
                await this._earnings.updateEarnings({
                  ...json,
                  batch_id,
                  payment_confirmation_method: 'batch',
                  payment_confirmed_by: adminId,
                });
                count += 1;
              },
              function (e) {
                reject(e);
              },
              function () {
                resolve(count);
              },
            );
        });
      };

      const uploadResult = await uploadCsv(fileBuffer, key);

      const createdBatch = await batch.createBatch({
        url: uploadResult.Location,
        status: 'created',
        active: true,
      });
      batchId = createdBatch.id;

      await this._session.beginTransaction();

      const count = await batchUpdateEarnings(createdBatch.id);

      // delete temp file
      await fs.promises.unlink(file.path);

      // update batch status to completed
      await batch.updateBatch({ id: createdBatch.id, status: 'completed' });

      await this._session.commitTransaction();
      return {
        status: 'completed',
        count,
      };
    } catch (e) {
      // update batch status to failed, if code errors out before batch was created
      if (batchId) {
        await batch.updateBatch({
          id: batchId,
          status: 'failed',
          active: false,
        });
      }
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      // delete temp file
      await fs.promises.unlink(file.path);
      throw e;
    }
  }

  async getBatchEarnings(filter) {
    return this._earnings.getBatchEarnings(filter);
  }
}

module.exports = EarningsService;
