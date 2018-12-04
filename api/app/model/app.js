'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const App = app.model.define('app', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appid: STRING(30),
    name: STRING(30),
    description: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  App.sync();

  return App;
};