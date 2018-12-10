export function arrToTree({arr,key="id",parentKey="parentId"}){
    let mapArr = {}, finalArr = [], newArr = JSON.parse(JSON.stringify(arr));
    newArr.map(item=> mapArr[item[key]] = item);

    Object.keys(mapArr).map(key => {
        if (mapArr[key].parentId) {
            let pItem = mapArr[mapArr[key].parentId];
            if(pItem) { 
                !pItem.children && (pItem.children = []);
                pItem.children.push(mapArr[key]);
            }
        } else {
            finalArr.push(mapArr[key]);
        }
    });
    return finalArr;
}

export function turnLogsActionToView(action) {
    const actionMap = {
        "remove_role": "移除角色",
        "add_role": "添加角色",
        "user_permission": "用户权限",
        "edit_app": "编辑应用",
        "edit_permission": "编辑权限",
        "add": "添加",
        "edit": "编辑",
        "edit_role": "编辑角色",
        "set_permission": "设置权限"
    }

    return actionMap[action] || action;
}