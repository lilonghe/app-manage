'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};

exports.cors = {
    enabled: true,
    package: 'egg-cors'
}