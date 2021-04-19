# Permission Manage
初步实现了权限管理系统，最后更新于 2019-02-13，因为没有实现的必要性，也没有强烈的驱动，所以暂停更新并且提供出目前可用服务。  
服务器也将于 2021 年 7 月份关闭，关闭后无法预览。

# API

## Get User Permission
`/api/services/get-user-permissions?appid=${appid}&userid=${userid}`

### Params
`appid`,`userid`

### Response 
```
[
  {
    "id":1,
    "appid":1,
    "title":"客户管理",
    "public":0,
    "code":"customer_manage",
    "type":"menu",
    "description":null,
    "url":"/customer",
    "style":null,
    "icon":null,
    "parentId":null,
    "rank":0,
    "created_at":"2018-12-23T09:52:42.000Z",
    "updated_at":"2018-12-23T09:52:42.000Z"
  }
]
```

## Check User Permission
`/services/check-user-permission?appid=${appid}&userid=${userid}&permission_code=${permission_code}`

### Params
`appid`,`userid`,`permission_code`

### Response
```
{ success: false/true }
```

# Preview
<img width="500" alt="截屏2021-04-19 16 49 28" src="https://user-images.githubusercontent.com/12867278/115209904-a1ccfc80-a130-11eb-83c6-9468fd51e04b.png">
<img width="500" alt="截屏2021-04-19 16 49 12" src="https://user-images.githubusercontent.com/12867278/115209917-a4c7ed00-a130-11eb-9c89-5ae4acdb3563.png">
<img width="500" alt="截屏2021-04-19 16 49 00" src="https://user-images.githubusercontent.com/12867278/115209920-a5f91a00-a130-11eb-84f5-74019b19be41.png">

