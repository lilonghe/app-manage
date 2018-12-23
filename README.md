# 应用管理
应用权限配置中心, 目前为`MVP`版本，不适合直接用在生产  

1.0  
基础角色及权限和用户权限管理  
登录管控  
外部 API

2.0  
向下颁发权限(多用户，多层级管控)   
公共映射角色

3.0  
动态可配置范围  
基于组织或架构

```
$ cd api && npm run dev
$ cd web-client
$ npm run vendor
$ npm start
```

------
随便找了一个测试工具跑了下，不知道跑的对不对。测试时表现出`CPU`是瓶颈， `QPS 300`时`CPU`占用率为`75%-90%`，`QPS 400`时`CPU`占用率为`100%`，成功率基本就`80%`。内存一直保持为`400MB`以下，基本是没有大的波动。

tool: [https://github.com/tsenart/vegeta](vegeta)  
server: 阿里云轻量应用服务器，1c2g1u  
client: 家用百兆电信  
config: 持续时长=30s 并发=300 每秒=300


无缓存下测试结果：
```
Requests      [total, rate]            9000, 300.03
Duration      [total, attack, wait]    30.0090448s, 29.9970985s, 11.9463ms
Latencies     [mean, 50, 95, 99, max]  271.846144ms, 24.412676ms, 965.842875ms, 995.090769ms, 1.0151335s
Bytes In      [total, mean]            16029000, 1781.00
Bytes Out     [total, mean]            0, 0.00
Success       [ratio]                  100.00%
Status Codes  [code:count]             200:9000
```