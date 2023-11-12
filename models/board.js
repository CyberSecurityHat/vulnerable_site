// models/board.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
  };

  Board.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Board',
    tableName: 'board',
    timestamps: false
  });

  return Board;
};