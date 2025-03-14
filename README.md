# 飞书志愿填充插件

这是一个飞书表格插件，用于将表格中的学校志愿数据自动填充到HTML页面中。

## 功能特点

- 自动读取飞书表格中的志愿学校数据
- 将数据填充到对应的HTML志愿展示页面
- 简单一键操作，无需手动复制粘贴

## 使用方法

1. 在飞书开发者平台创建应用
2. 在"插件配置"中填入此GitHub仓库地址
3. 在你的飞书表格中启用插件
4. 点击工具栏中的"填充志愿数据"按钮即可使用

## 数据格式要求

表格第一行数据格式要求：
- A列：志愿1学校名称
- B列：志愿2学校名称
- C列：志愿3学校名称
- D列：志愿4学校名称

## 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

## 注意事项

- 插件需要表格的只读权限
- 确保表格数据格式正确
- HTML文件需要在本地存在并可写入
