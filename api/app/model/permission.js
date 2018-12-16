'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const Permission = app.model.define('permission', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appid: INTEGER,
    title: STRING(30),
    public: BOOLEAN,
    code: STRING(30),
    type: STRING(30),
    description: STRING(200),
    url:  STRING(200),
    style: STRING(200),
    icon:  STRING(200),
    parentId: INTEGER,
    rank: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Permission.sync();

  return Permission;
};