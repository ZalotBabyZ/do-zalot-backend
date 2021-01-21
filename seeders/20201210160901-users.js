'use strict';
require('dotenv').config;
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstname: 'Tony',
        lastname: 'Stark',
        username: 'IronMan',
        email: 'IronMan@avengers.mcu',
        image: 'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1607618398/marvel/1296885_3_xbijxe.jpg',
        password: bcryptjs.hashSync('iAmIronMan', salt),
        gender: 'MALE',
        user_color: '#cd4528',
        user_vip: true,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
      },
      {
        firstname: 'Steve',
        lastname: 'Rogers',
        username: 'CaptainAmerica',
        email: 'CaptainAmerica@avengers.mcu',
        image: 'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1607618399/marvel/1296885_4_mrwzfb.jpg',
        password: bcryptjs.hashSync('iAmACaptain', salt),
        gender: 'MALE',
        user_color: '#0397c6',
        user_vip: true,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2400)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2400)),
      },
      {
        firstname: 'Bruce',
        lastname: 'Banner',
        username: 'Hulk',
        email: 'Hulk@avengers.mcu',
        image: 'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1607618398/marvel/1296885_1_totiz7.jpg',
        password: bcryptjs.hashSync('BestOfBothWorlds', salt),
        gender: 'MALE',
        user_color: '#489744',
        user_vip: true,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2450)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2450)),
      },
      {
        firstname: 'Stephen',
        lastname: 'Strange',
        username: 'DoctorStrange',
        email: 'Strange@kamarTaj.mcu',
        image: 'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1607618398/marvel/1296885_2_xuw0bo.jpg',
        password: bcryptjs.hashSync('ProtectingYourReality', salt),
        gender: 'MALE',
        user_color: '#3c4041',
        user_vip: false,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
      },
      {
        firstname: 'baobao',
        lastname: 'zheng',
        username: 'BabyZ',
        email: 'babyzalot@gmail.com',
        image:
          'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1611223674/marvel/iron_man_artwork_4k-wide_eksmfh.jpg',
        password: bcryptjs.hashSync('HelloWorld', salt),
        gender: 'FEMALE',
        user_color: '#73cfec',
        user_vip: false,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
        updated_at: new Date(new Date().setDate(new Date().getDate() - 2500)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
