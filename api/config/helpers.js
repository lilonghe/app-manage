exports.SequelizeUpdateResu = function(resu) {
    if (resu && resu.length > 0) {
        return resu[0]
    }
    return 0;
}

exports.ActionResult = function(resu=false) {
    return { success: resu }
}