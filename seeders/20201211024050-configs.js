'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('configs', [
      {
        project_id: 1,
        delete_right: 1,
        editable_config: false,
        edit_config_right: 1,
        editable_score: true,
        edit_score_right: 3,
        editable_assign: true,
        edit_assign_right: 3,
        regressable: false,
        regress_right: 1,
        expelable: false,
        expel_right: 1,
        approve_by_a: 1,
        approve_by_b: 2,
        approve_by_c: 3,
        project_color: '#ac51ed',
        project_deadline: '2021-01-31',
      },
      {
        project_id: 2,
        delete_right: 1,
        edit_config_right: 1,
        edit_score_right: 1,
        edit_assign_right: 1,
        regress_right: 1,
        expel_right: 1,
        approve_by_a: 1,
        approve_by_b: 2,
        project_color: '#ed8851',
        project_deadline: '2021-01-31',
      },
      {
        project_id: 3,
        delete_right: 4,
        edit_config_right: 4,
        edit_score_right: 4,
        edit_assign_right: 4,
        regress_right: 4,
        expel_right: 4,
        approve_by_a: 4,
        approve_by_b: 4,
        approve_by_c: 4,
        project_color: '#5180ed',
        project_deadline: '2021-01-31',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('configs', null, {});
  },
};
