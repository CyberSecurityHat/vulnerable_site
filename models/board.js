// models/board.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    // 관계 등을 정의할 수 있습니다.
  };

  Board.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Board',
    tableName: 'board', // 실제 테이블 이름
    timestamps: false
  });

  return Board;
};