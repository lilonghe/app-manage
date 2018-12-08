'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appid: INTEGER,
    name: STRING(30),
    code: STRING(30),
    description: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });

  Role.sync();

  return Role;
};