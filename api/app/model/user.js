'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userid: STRING(30),
    name: STRING(30),
    dept_name: STRING(30),
    remark: STRING(300),
    created_at: DATE,
    updated_at: DATE,
  });

  User.sync();

  return User;
};