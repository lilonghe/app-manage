'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AppLog = app.model.define('app_log', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appid: INTEGER,
    action: STRING(30),
    action_type: STRING(30),
    reason: STRING(200),
    before: STRING(200),
    after: STRING(200),
    before_source: STRING(2000),
    after_source: STRING(2000),
    operator_user: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  AppLog.sync();

  return AppLog;
};