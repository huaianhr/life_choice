# 贡献指南

感谢您考虑为"人生选择器"项目做出贡献！

## 🤝 如何贡献

### 报告Bug

如果您发现了Bug，请：

1. 检查 [Issues](https://github.com/YOUR_USERNAME/人生选择器/issues) 确认问题未被报告
2. 创建新Issue并包含以下信息：
   - Bug的详细描述
   - 复现步骤
   - 期望行为
   - 实际行为
   - 截图（如适用）
   - 浏览器和操作系统信息

### 提出新功能

如果您有好的想法：

1. 先在 Issues 中讨论您的想法
2. 说明功能的用途和预期效果
3. 如果得到认可，可以开始实现

### 贡献代码

#### 开发流程

1. **Fork 仓库**
   ```bash
   # 在GitHub上点击Fork按钮
   ```

2. **克隆您的Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/人生选择器.git
   cd 人生选择器
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **开发**
   ```bash
   npm run dev
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "描述您的更改"
   ```

7. **推送到您的Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建Pull Request**
   - 访问原仓库
   - 点击"New Pull Request"
   - 选择您的分支
   - 填写详细的PR描述

#### 代码规范

**文件命名**
- 组件文件：PascalCase（如 `UserInfo.vue`）
- 工具文件：camelCase（如 `algorithm.js`）
- 数据文件：camelCase（如 `foods.js`）

**代码风格**
- 使用2空格缩进
- 使用单引号
- 组件使用 `<script setup>` 语法
- 添加必要的注释（中文）
- 遵循Vue 3最佳实践

**提交信息规范**
```
类型: 简短描述

详细描述（可选）

关联Issue（可选）
```

类型包括：
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

示例：
```
feat: 添加每日运势功能

- 增加运势计算模块
- 添加运势展示组件
- 更新主页面布局

Closes #123
```

### 贡献数据

#### 添加午餐数据

编辑 `src/data/foods.js`：

```javascript
{
  id: 56, // 递增ID
  name: '菜名',
  category: '分类',
  seasons: ['春', '夏'], // 适合季节
  elements: ['金', '木'], // 五行属性
  temperature: 'hot', // hot/warm/cold
  calories: 'medium', // high/medium/low
  tags: ['标签1', '标签2'],
  description: '描述'
}
```

#### 添加穿搭数据

编辑 `src/data/clothing.js`：

```javascript
{
  id: 56, // 递增ID
  style: '风格名称',
  items: ['单品1', '单品2', '单品3'],
  gender: 'male', // male/female/unisex
  tempRange: [10, 20], // 适宜温度范围
  season: '春', // 季节
  occasion: ['场合1', '场合2'],
  zodiacMatch: ['星座1', '星座2'],
  description: '描述'
}
```

### 改进算法

如果您想改进推荐算法：

1. 查看 `src/utils/algorithm.js`
2. 理解现有权重计算逻辑
3. 提出您的改进方案
4. 在Issue中讨论
5. 实现并测试
6. 提交PR

### 优化UI

如果您擅长设计：

1. 保持科技感风格
2. 确保响应式布局
3. 注意动画性能
4. 测试多种设备
5. 提供前后对比图

## 📋 开发注意事项

### 全局思维
- 修改代码前考虑对其他模块的影响
- 保持代码的一致性
- 避免重复代码

### 测试
- 测试新功能在不同场景下的表现
- 验证响应式布局
- 检查浏览器兼容性

### 文档
- 更新相关文档
- 添加必要的代码注释
- 更新CHANGELOG

## 🎯 开发建议

### 新手友好任务
- 添加更多午餐/穿搭数据
- 改进文案和描述
- 优化UI细节
- 修复拼写错误

### 中级任务
- 添加新的选择器类型
- 优化算法权重
- 改进动画效果
- 添加新功能

### 高级任务
- 重构核心算法
- 性能优化
- 架构改进
- 复杂功能开发

## 🙏 行为准则

- 尊重他人
- 建设性反馈
- 保持友善
- 开放心态

## ❓ 需要帮助？

- 查看 [README](./README.md)
- 阅读 [部署指南](./DEPLOY.md)
- 在Issue中提问
- 查看现有的PR

## 📜 许可证

贡献的代码将遵循项目的 [MIT License](./LICENSE)。

---

再次感谢您的贡献！🎉

