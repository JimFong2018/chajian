import { bitable } from "@lark-base-open/js-sdk";

// 初始化飞书表格SDK
async function initializePlugin() {
  try {
    // 获取当前选中的表格
    const table = await bitable.base.getActiveTable();
    
    // 获取表格数据
    const records = await table.getRecords();
    
    // 获取第一行数据
    const firstRow = records[0];
    
    // 获取字段列表
    const fields = await table.getFieldList();
    
    // 获取学校名称
    const schools = [];
    for (let i = 0; i < 4; i++) {
      const field = fields[i];
      if (field) {
        const value = await table.getCellValue(field.id, firstRow.recordId);
        schools.push(value || '');
      }
    }
    
    // 更新HTML内容
    updateHtmlContent(schools);
    
  } catch (error) {
    console.error('获取表格数据失败:', error);
  }
}

// 更新HTML内容的函数
async function updateHtmlContent(schools) {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // 读取HTML文件
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // 更新每个志愿的内容
    const html = `
      <div class="volunteer-plugin">
        <h1>志愿推荐</h1>
        <div class="timeline">
          ${schools.map((school, index) => `
            <div class="timeline-item">
              <div class="timeline-number">志愿${index + 1}</div>
              <div class="timeline-content">${school}</div>
            </div>
          `).join('')}
        </div>
        <style>
          .volunteer-plugin {
            padding: 20px;
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
          }
          h1 {
            color: #2196F3;
            margin-bottom: 30px;
          }
          .timeline {
            position: relative;
            padding-left: 30px;
          }
          .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #2196F3;
          }
          .timeline-item {
            position: relative;
            margin-bottom: 25px;
            padding-left: 20px;
          }
          .timeline-item::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #2196F3;
          }
          .timeline-number {
            color: #2196F3;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .timeline-content {
            background-color: #f0f7ff;
            padding: 15px;
            border-radius: 5px;
            font-size: 16px;
          }
        </style>
      </div>
    `;
    
    // 保存更新后的HTML
    fs.writeFileSync(htmlPath, htmlContent.replace(/<body>.*?<\/body>/s, `<body>${html}</body>`));
    
    console.log('HTML更新成功！');
    
  } catch (error) {
    console.error('更新HTML失败:', error);
  }
}

// 注册插件
bitable.registerPlugin({
  async onEnable() {
    console.log('插件已启用');
  },
  
  async onDisable() {
    console.log('插件已禁用');
  },
  
  actions: {
    'fill-data': async function() {
      await initializePlugin();
    }
  }
});
