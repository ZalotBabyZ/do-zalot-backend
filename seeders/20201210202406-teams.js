'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        project_id: '1',
        user_id: '1',
        user_role: 'SUPERVISOR',
        user_status: 'MEMBER',
        user_pin: 0,
        order: 1,
        created_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
      },
      {
        project_id: '2',
        user_id: '1',
        user_role: 'SUPERVISOR',
        user_status: 'MEMBER',
        user_pin: 1,
        order: 2,
        created_at: new Date(new Date().setDate(new Date().getDate() - 201)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 201)),
      },
      {
        project_id: '1',
        user_id: '3',
        user_role: 'TEAM_MEMBER',
        user_status: 'MEMBER',
        user_pin: -1,
        order: 2,
        created_at: new Date(new Date().setDate(new Date().getDate() - 2000)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
      },
      {
        project_id: '2',
        user_id: '3',
        user_role: 'TEAM_MEMBER',
        user_status: 'INVITED',
        user_pin: -1,
        order: 2,
        created_at: new Date(new Date().setDate(new Date().getDate() - 201)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 201)),
      },
      {
        project_id: '1',
        user_id: '2',
        user_role: 'TEAM_MEMBER',
        user_status: 'MEMBER',
        user_pin: 0,
        order: 1,
        created_at: new Date(new Date().setDate(new Date().getDate() - 2000)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
      },
      {
        project_id: '2',
        user_id: '2',
        user_role: 'TEAM_MEMBER',
        user_status: 'MEMBER',
        user_pin: 0,
        order: 2,
        created_at: new Date(new Date().setDate(new Date().getDate() - 200)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 201)),
      },
      {
        project_id: '2',
        user_id: '4',
        user_role: 'TEAM_MEMBER',
        user_status: 'FORMER_MEMBER',
        user_pin: 0,
        order: 2,
        created_at: new Date(new Date().setDate(new Date().getDate() - 198)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 200)),
      },
      {
        project_id: '3',
        user_id: '4',
        user_role: 'TEAM_MEMBER',
        user_status: 'MEMBER',
        user_pin: 0,
        order: 1,
        created_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2001)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  },
};
