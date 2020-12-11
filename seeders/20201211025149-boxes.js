'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('boxes', [
      {
        project_id: '1',
        box_name: 'MISSION',
        description: 'todo',
        type: 'TODO',
        box_color: 'var(--thirdaryDarkest-color)',
        project_pin: 2,
        order: 1,
      },
      {
        project_id: '1',
        box_name: 'SECRET MISSION',
        description: '[secret] todo',
        type: 'TODO',
        box_color: 'var(--scondaryDarkest-color)',
        project_pin: 3,
        order: 2,
      },
      {
        project_id: '1',
        box_name: 'ON GOING',
        description: 'doing',
        type: 'DOING',
        box_color: 'var(--scondaryDarkest-color)',
        project_pin: 0,
        order: 3,
      },
      {
        project_id: '1',
        box_name: 'MISSION COMPLETE',
        description: 'done',
        type: 'DONE',
        box_color: 'var(--scondary-color)',
        project_pin: 0,
        order: 4,
      },
      {
        project_id: '1',
        box_name: 'RESOURCE',
        description: 'map picture',
        type: 'NOTE',
        project_pin: 1,
        order: 5,
      },
      {
        project_id: '1',
        box_name: 'CONTACT',
        description: 'phone number',
        type: 'NOTE',
        project_pin: -1,
        order: 6,
      },
      {
        project_id: '2',
        box_name: 'MISSION',
        description: 'todo',
        type: 'TODO',
        box_color: 'var(--thirdaryDarkest-color)',
        project_pin: 2,
        order: 1,
      },
      {
        project_id: '2',
        box_name: 'SECRET MISSION',
        description: '[secret] todo',
        type: 'TODO',
        box_color: 'var(--scondaryDarkest-color)',
        project_pin: 3,
        order: 2,
      },
      {
        project_id: '2',
        box_name: 'ON GOING',
        description: 'doing',
        type: 'DOING',
        box_color: 'var(--scondaryDarkest-color)',
        project_pin: 0,
        order: 3,
      },
      {
        project_id: '2',
        box_name: 'MISSION COMPLETE',
        description: 'done',
        type: 'DONE',
        box_color: 'var(--scondary-color)',
        project_pin: 0,
        order: 4,
      },
      {
        project_id: '2',
        box_name: 'RESOURCE',
        description: 'map picture',
        type: 'NOTE',
        project_pin: 1,
        order: 5,
      },
      {
        project_id: '2',
        box_name: 'CONTACT',
        description: 'phone number',
        type: 'NOTE',
        project_pin: -1,
        order: 6,
      },
      {
        project_id: '3',
        box_name: 'TODO',
        description: 'todo',
        type: 'TODO',
        box_color: 'var(--thirdaryDarkest-color)',
        project_pin: 3,
        order: 1,
      },
      {
        project_id: '3',
        box_name: 'DOING',
        description: 'doing',
        type: 'DOING',
        box_color: 'var(--scondaryDarkest-color)',
        project_pin: 0,
        order: 3,
      },
      {
        project_id: '3',
        box_name: 'DONE',
        description: 'done',
        type: 'DONE',
        box_color: 'var(--scondary-color)',
        project_pin: 0,
        order: 4,
      },
      {
        project_id: '3',
        box_name: 'MAP',
        description: 'map',
        type: 'NOTE',
        project_pin: 1,
        order: 5,
      },
      {
        project_id: '3',
        box_name: 'CONTACT',
        description: 'phone number',
        type: 'NOTE',
        project_pin: 2,
        order: 6,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('boxes', null, {});
  },
};
