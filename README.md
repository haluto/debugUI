# debugUI

## APIs

### 获取设备列表 - /cmd/adb/devices

- req:

  - type: `POST`
  - url: `/cmd/adb/devices`

- res:

  - String - converted from array: `"xxxxx, yyyyyy"`, you can get it by string split method:

    ```javascript
    let arr = res.split(",");
    ```

### input命令 - /cmd/adb/shell/input

- req:
  - type: `POST`
  - url: `/cmd/adb/shell/input`
  - dataType: `json`
  - data: `{device: xxxxxx, key: yyyyyy}`
    - device: the device serial number. [Optional]
    - key: the keyevent. [Mandatory]
- res:
  - Nothing important.

### 截屏 - /cmd/adb/shell/screencap

- req:
  - type: `POST`
  - url: `/cmd/adb/shell/screencap`
  - dataType: `json`
  - data: `{device: xxxxxx}`
    - device: the device serial number. [Optional]
- res:
  - json: `{ok: 'ok', info: <imagePath>}`or `{ok: 'error', info: <errorMessage>}`

### Battery - 省电模式状态 - /cmd/battery/batterysaver

- req:
  - type: `POST`
  - url: `/cmd/battery/batterysaver`
  - dataType: `json`
  - data: `{device: xxxxxx, op: get}`or `{device: xxxxxx, op: set, value: 0/1}`
    - device: the device serial number. [Optional]
    - op: the operation, get or set. [Mandatory]
    - value: Mandatory if op is set. value should be 0 or 1.
- res:
  - json: `{ok:'ok', value: 0/1}` or `{ok:'error', value: <errorMessage>}`

### Battery - 充电状态 - /cmd/battery/charging

- req:
  - type: `POST`
  - url: `/cmd/battery/charging`
  - dataType: `json`
  - data: `{device: xxxxxx, op: get}`or `{device: xxxxxx, op: set, value: 0/1}`
    - device: the device serial number. [Optional]
    - op: the operation, get or set. [Mandatory]
    - value: Mandatory if op is set. value should be 0 or 1.
- res:
  - json: `{ok:'ok', value: 0/1}` or `{ok:'error', value: <errorMessage>}`


# Development Notes

### Icon of antd

- antd中的Icon需要额外安装：

```shell
$ npm install --save @ant-design/icons
```

- 安装后使用时不再是`<Icon type="xxx" />`，而是每个icon都直接用自己的component

  ```javascript
  import { MobileOutlined } from '@ant-design/icons';
  
  ...
  
  <MobileOutlined />
  ```

  

