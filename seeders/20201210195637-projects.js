'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', [
      {
        project_name: 'Age of Ultron',
        description:
          ' อัลตรอน หุ่นยนต์แอนดรอยด์ที่สร้างโดย ดร.เฮนรี่ แฮงค์ พีม เพื่อให้มีกระบวนการคิดและมีอารมณ์แบบมนุษย์เกิดผิดพลาด มันไม่สามารถควบคุมอารมณ์แบบมนุษย์ได้ จึงเปลี่ยนความรู้สึกทั้งหมดไปเกลียดและมีความุ่งหวังที่จะฆ่าล้างโลกไม่ให้มีมนุษย์ ความสามารถของอัลตรอนคือมันพัฒนาตัวเองได้รวมถึงถูกสร้างใหม่ได้อีกหลายครั้ง',
        project_vip: false,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 400)),
      },
      {
        project_name: 'Infinity War',
        description:
          'Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality.',
        project_vip: true,
        vip_until: '2021-01-31',
        created_at: new Date(),
      },
      {
        project_name: 'Eye of Agamotto',
        description:
          'Kaecilius and his followers use the stolen pages to begin summoning the powerful Dormammu of the Dark Dimension, where time does not exist and all can live forever.',
        project_vip: true,
        vip_until: '2021-01-31',
        created_at: new Date(new Date().setDate(new Date().getDate() - 2000)),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  },
};
