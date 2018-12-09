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

exports.ErrRoleCodeAlreadyExists = {
    error_code: 'role_code_already_exists',
    error_message: '角色CODE已使用，请确认是否重复'
}

exports.ErrPermissionCodeNotFound = {
    error_code: 'permission_code_not_found',
    error_message: '权限未找到，请确认提供的CODE是正确的'
}

exports.ErrRoleCodeNotFound = {
    error_code: 'role_code_not_found',
    error_message: '角色未找到，请确认提供的CODE是正确的'
}

exports.ErrMissParam = {
    error_code: 'miss_param',
    error_message: '缺少参数，请检查提供的参数是否正确'
}

exports.ErrBadPermissionType = {
    error_code: 'bad_permission_type',
    error_message: '权限类型无效，请确认提供了正确的权限类型'
}

exports.ErrPermissionTypeReadonly = {
    error_code: 'permission_type_readonly',
    error_message: '权限类型是只读的，不可变更'
}

exports.ErrPermissionCodes = {
    error_code: 'permission_codes',
    error_message: '权限CODE无效，权限数据已更新，请刷新页面重新加载'
}

exports.ErrRepeatedUser = {
    error_code: 'repeated_user',
    error_message:'用户唯一标识重复，请确认提交的数据'
}

exports.ErrUserNotFound = {
    error_code: 'user_not_found',
    error_message:'用户不存在，请确认提交的数据'
}

exports.ErrUserAleradyHasRole = {
    error_code: 'user_alerady_has_role',
    error_message: '用户已拥有此角色'
}

exports.ErrUserNotHasRole = {
    error_code: 'user_not_has_role',
    error_message: '用户未拥有此角色'
}