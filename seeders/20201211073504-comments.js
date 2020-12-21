'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        user_id: '1',
        list_id: '1',
        content: 'แน่ใจนะว่าคทาของโลกิอยู่ที่ Sokovia ทำไมฉันเห็นในเว็บประมูล ShenZhen',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540150000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540150000)),
      },
      {
        user_id: '2',
        list_id: '1',
        content: 'ต้องลองไปถาม thor ดูว่าของจริงหน้าตาเป็นยังไง',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540145000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540145000)),
      },
      {
        user_id: '3',
        list_id: '1',
        content: 'ฉันเพิ่มTodo list ให้แล้ว นายลองไปถาม thor ดูนะ cap',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540135000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540135000)),
      },
      {
        user_id: '2',
        list_id: '1',
        content: 'thor อยู่ที่ไหน',
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
        content: 'ฉันแปะรูปจากเว็ปไว้ให้ที่กล่องresourceแล้ว ลองเอาไปให้thorดูนะ',
        created_at: new Date(new Date().setTime(new Date().getTime() - 540120000)),
        updated_at: new Date(new Date().setTime(new Date().getTime() - 540120000)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
