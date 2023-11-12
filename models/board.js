const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Board',
      tableName: 'board',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate(db) {
  }
};
