'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('assigns', [
      {
        user_id: '1',
        list_id: '1',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 7)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
      {
        user_id: '2',
        list_id: '5',
        user_status: 'ABOLISH',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540130000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540100000)),
      },
      {
        user_id: '3',
        list_id: '5',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540100000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540100000)),
      },
      {
        user_id: '3',
        list_id: '1',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 6)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 6)),
      },
      {
        user_id: '1',
        list_id: '2',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 3)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 3)),
      },
      {
        user_id: '2',
        list_id: '2',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 3)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 3)),
      },
      {
        user_id: '3',
        list_id: '3',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 1)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      {
        user_id: '3',
        list_id: '2',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 3)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 3)),
      },
      {
        user_id: '1',
        list_id: '3',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 1)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      {
        user_id: '2',
        list_id: '3',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 1)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      {
        user_id: '2',
        list_id: '4',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 365)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 365)),
      },
      {
        user_id: '4',
        list_id: '7',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540240000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540240000)),
      },
      {
        user_id: '4',
        list_id: '8',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540280000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540280000)),
      },
      {
        user_id: '4',
        list_id: '9',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 1800)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 1800)),
      },
      {
        user_id: '4',
        list_id: '10',
        user_status: 'UNDERTAKE',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2000)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2000)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('assigns', null, {});
  },
};
