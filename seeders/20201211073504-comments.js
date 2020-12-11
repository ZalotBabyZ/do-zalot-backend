'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        user_id: '1',
        list_id: '1',
        content: 'พวกนายแน่ใจนะว่า Sokovia ฉันเห็นประมูลอยู่ที่ shenZhen',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540150000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540150000)),
      },
      {
        user_id: '2',
        list_id: '1',
        content: 'นายลองไปถาม thor ดูสิว่าของจริงเป็นยังไง',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540145000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540145000)),
      },
      {
        user_id: '3',
        list_id: '1',
        content: 'เพิ่มให้แล้ว นายไปหา thor นะ ตัน',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540135000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540135000)),
      },
      {
        user_id: '2',
        list_id: '1',
        content: 'ที่ไหน',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540130000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540130000)),
      },
      {
        user_id: '3',
        list_id: '1',
        content: 'แอสการ์ด',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540128000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540128000)),
      },
      {
        user_id: '1',
        list_id: '1',
        content: 'แปะรูปให้ที่resourceแล้ว ฝากเอาไปให้thorดูดด้วย',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540120000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540120000)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
