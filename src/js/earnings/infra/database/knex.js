const log = require('loglevel');
const knex = require('knex');

// const connection = require('../../../config/config').connectionString;
const connection =
  'postgresql://postgres:password@localhost:5432/treetracker_db';
console.log('URL: ', connection);

const postgresPattern = /^postgresql:\//;

if (!postgresPattern.test(connection)) {
  throw new Error('invalid database connection url received');
}

const knexConfig = {
  client: 'pg',
  debug: process.env.NODE_LOG_LEVEL === 'debug',
  connection,
  pool: { min: 0, max: 10 },
};

log.debug(process.env.DATABASE_SCHEMA);
if (process.env.DATABASE_SCHEMA) {
  log.info('setting a schema');
  knexConfig.searchPath = [process.env.DATABASE_SCHEMA];
}
log.debug(knexConfig.searchPath);

module.exports = knex(knexConfig);
