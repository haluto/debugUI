# debugUI

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

  

