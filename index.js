const { bitable } = require('@lark-base-open/js-sdk');

// 初始化飞书表格SDK
async function initializePlugin() {
  try {
    // 获取当前选中的表格
    const table = await bitable.base.getActiveTable();
    
    // 获取表格数据
    const records = await table.getRecords();
    
    // 获取第一行数据（假设第一行包含志愿学校信息）
    const firstRow = records[0];
    
    // 提取学校名称
    const schools = [
      firstRow.fields['A'] || '',  // 志愿1
      firstRow.fields['B'] || '',  // 志愿2
      firstRow.fields['C'] || '',  // 志愿3
      firstRow.fields['D'] || ''   // 志愿4
    ];
    
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
    for (let i = 0; i < 4; i++) {
      const schoolName = schools[i];
      const searchText = `志愿${i + 1}</div>\\s*<div class="timeline-content">.*?</div>`;
      const replaceText = `志愿${i + 1}</div><div class="timeline-content">${schoolName}</div>`;
      
      htmlContent = htmlContent.replace(new RegExp(searchText), replaceText);
    }
    
    // 保存更新后的HTML
    fs.writeFileSync(htmlPath, htmlContent);
    
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
