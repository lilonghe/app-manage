const errors = require('./errors');

exports.SequelizeUpdateResu = function(resu) {
    if (resu && resu.length > 0) {
        return resu[0]
    }
    return 0;
}

exports.ActionResult = function(resu=false) {
    return { success: resu }
}

exports.CheckPermissionType = function(type) {
    const types = ['menu', 'button', 'permission'];
    if (!type || !types.find( t => t == type)) {
        return errors.ErrBadPermissionType;
    }
    return null;
}