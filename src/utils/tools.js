export function arrToTree({arr,key="_id",parentKey="parentId"}){
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