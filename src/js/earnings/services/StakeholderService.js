const axios = require('axios').default;
const StakeholderService = require('../../stakeholders/services/StakeholderService');
const {
  adminMiddleware,
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../stakeholders/utils/helper');

// const TREETRACKER_STAKEHOLDER_API_URL = 'http://localhost:3000/stakeholders';

const getStakeholderById = async (id) => {
  // const response = await axios.get(`${TREETRACKER_STAKEHOLDER_API_URL}/${id}`);
  // // console.log('response from stakeholder API: ', response);
  // return response.data.stakeholders[0];

  // const { id } = req.params;

  // const { filter, limitOptions } = getFilterAndLimitOptions(req.query);
  const stakeholderService = new StakeholderService();

  const { stakeholders, totalCount } =
    await stakeholderService.getAllStakeholdersById(id);

  const url = `stakeholders/${id}`;

  const links = generatePrevAndNext({
    url,
    count: totalCount,
    limitOptions: { limit: 20, offset: 0 },
  });

  return {
    stakeholders,
    links,
    totalCount,
  };
};

module.exports = { getStakeholderById };
