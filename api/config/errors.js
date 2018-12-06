exports.ErrAppNotFound = {
    error_code: 'app_not_found',
    error_message: '应用未找到,请确认应用存在'
}

exports.ErrAppAlreadyExists = {
    error_code: 'app_already_exists',
    error_message: '应用已存在，请确认APPID或者名称是否重复'
}

exports.ErrPermissionCodeAlreadyExists = {
    error_code: 'permission_code_already_exists',
    error_message: '权限CODE已使用，请确认是否重复'
}

exports.ErrPermissionCodeNotFound = {
    error_code: 'permission_code_not_found',
    error_message: '权限为找到，请确认提供的CODE是正确的'
}