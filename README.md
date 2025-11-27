# 人生选择器 🎯

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://github.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.4-green)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

基于八字、星座等个人属性的智能决策助手，帮你在人生的十字路口做出最佳选择。

> 🎨 **科技感UI设计** | 📱 **完美适配移动端** | 🔒 **数据本地存储** | 🚀 **纯前端实现**

## ✨ 核心功能

### 🍜 中午吃什么
- **快速模式**：结合**当前季节**和**五行属性**智能推荐，内置55+道上海特色午餐
- **智能模式**：🆕 AI生成个性化推荐，包含推荐理由、营养分析、价格、购买地点
- 考虑食物温热属性和营养搭配
- 提供多个备选方案

### 👔 约会穿什么
- **快速模式**：根据**实时气温**和**个人风格**推荐，内置55+套上海穿搭方案
- **智能模式**：🆕 AI生成详细穿搭建议和搭配技巧
- 男女装分类，支持多种场合
- 结合星座特质和季节趋势

### 🎲 彩票选号器
- **双色球**：基于幸运数字生成6红1蓝
- **大乐透**：生成5前区+2后区号码
- **比大小**：五行推演预测结果
- 智能算法结合八字和星座

## 🎯 核心算法

### 智能推荐引擎
```
推荐度 = 基础权重(50分) 
       + 五行匹配(20分) 
       + 季节匹配(15分) 
       + 星座匹配(15分)
       + 温度匹配(25分)
```

### 八字五行计算
- 根据出生日期计算年柱、月柱、日柱
- 统计五行分布（金木水火土）
- 分析五行相生相克关系
- 给出个性化建议

### 星座特质分析
- 12星座性格特征
- 幸运颜色、数字、方向
- 星座元素匹配（火/土/风/水）
- 星座配对指数

## 🚀 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 组合式API + `<script setup>` |
| **Vite** | 快速的开发服务器和构建工具 |
| **纯前端** | 无后端依赖，部署简单 |
| **GitHub Pages** | 免费稳定的静态网站托管 |
| **和风天气API** | 可选的实时天气数据（免费版） |
| **LLM集成** | 🆕 支持OpenAI、Claude、通义千问等（可选） |

## 📦 快速开始

### 前置要求
- Node.js 18+
- npm 或 yarn

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/人生选择器.git
cd 人生选择器

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器自动打开 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

## 🌐 部署到 GitHub Pages

### 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，只需：

1. **Fork 或克隆仓库到您的 GitHub**
2. **推送代码到 main 分支**
3. **在仓库 Settings > Pages 中选择 GitHub Actions**
4. **等待自动构建完成**

详细部署指南请查看：[DEPLOY.md](./DEPLOY.md)

### 访问地址

```
https://YOUR_USERNAME.github.io/人生选择器/
```

## 📝 使用说明

### 第一步：填写个人信息
- 输入姓名（用于个性化问候）
- 选择出生日期（用于计算八字和星座）
- 选择性别（用于穿搭推荐）

> 💡 您的信息仅保存在浏览器本地，绝对安全！

### 第二步：选择决策类型
点击对应的卡片进入不同的选择器：
- 🍜 **中午吃什么** - 美食推荐
- 👔 **约会穿什么** - 穿搭建议  
- 🎲 **彩票选号器** - 幸运号码

### 第三步：查看推荐结果
- 查看详细的推荐理由
- 了解匹配度分数
- 浏览其他备选方案
- 一键重新生成

## ⚙️ 可选功能配置

### 天气API（可选）
**默认使用模拟天气数据，无需配置即可使用！**

如果想要使用真实天气数据：
1. 访问 [和风天气](https://dev.qweather.com/) 注册免费账号
2. 创建应用获取 API Key
3. 在应用设置中输入 API Key

详细配置指南：[API_SETUP.md](./API_SETUP.md)

### 🤖 智能模式（可选）
**🆕 使用AI大模型生成个性化推荐！**

支持的LLM服务商：
- OpenAI (GPT-3.5/4)
- Claude (Anthropic)
- 通义千问 (阿里云)
- Moonshot (月之暗面)
- DeepSeek (超低价)

配置步骤：
1. 选择一个LLM服务商并注册
2. 获取API Key
3. 在应用中点击⚙️设置按钮
4. 启用智能模式并输入API Key
5. 开始使用AI推荐！

**费用参考**：每次推荐约¥0.001-0.02（DeepSeek最便宜）

详细使用指南：[LLM_GUIDE.md](./LLM_GUIDE.md)

## 🎨 项目特色

### 科技感UI设计
- 深色主题配色
- 渐变色彩和光晕效果
- 流畅的动画过渡
- 现代化的卡片设计

### 智能算法
- 多维度权重计算
- 轮盘赌选择算法
- 基于种子的伪随机生成
- 考虑时间和环境因素

### 用户体验
- 响应式布局，适配各种设备
- 加载动画和过渡效果
- 本地存储用户信息
- 无需注册登录

### 数据完整
- 55+道上海特色午餐
- 55+套上海穿搭方案
- 详细的属性标签
- 季节和温度适配

## 📊 项目结构

```
人生选择器/
├── public/              # 静态资源
│   └── favicon.svg      # 网站图标
├── src/
│   ├── components/      # Vue组件
│   │   ├── UserInfo.vue           # 用户信息录入
│   │   ├── SelectorCard.vue       # 选择器卡片
│   │   ├── FoodSelector.vue       # 午餐选择器
│   │   ├── ClothingSelector.vue   # 穿搭选择器
│   │   └── LotterySelector.vue    # 彩票选择器
│   ├── data/            # 数据文件
│   │   ├── foods.js               # 午餐数据库
│   │   └── clothing.js            # 穿搭数据库
│   ├── utils/           # 工具函数
│   │   ├── algorithm.js           # 核心算法引擎
│   │   ├── bazi.js                # 八字计算
│   │   ├── zodiac.js              # 星座计算
│   │   └── weather.js             # 天气API
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions配置
├── index.html           # HTML模板
├── vite.config.js       # Vite配置
├── package.json         # 项目依赖
├── README.md            # 项目说明
├── DEPLOY.md            # 部署指南
├── API_SETUP.md         # API配置指南
└── LICENSE              # 开源协议

```

## 🔧 配置说明

### 修改仓库名称

如果您的仓库名不是"人生选择器"，需要修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',  // 修改这里
  // ...
})
```

### 修改城市

默认为上海，如需修改城市，编辑 `src/utils/weather.js`：

```javascript
const WEATHER_CONFIG = {
  cityId: '101010100'  // 修改为您的城市ID
}
```

## 🐛 问题反馈

遇到问题？请通过以下方式反馈：

1. 提交 [GitHub Issue](https://github.com/YOUR_USERNAME/人生选择器/issues)
2. 查看 [常见问题](./DEPLOY.md#常见问题)
3. 提交 Pull Request 修复

## 🤝 贡献指南

欢迎贡献代码！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 [MIT License](./LICENSE) 开源协议。

## 🙏 鸣谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [和风天气](https://www.qweather.com/) - 天气数据API
- [GitHub Pages](https://pages.github.com/) - 免费托管服务

## 📧 联系方式

- **项目主页**: [GitHub Repository](https://github.com/YOUR_USERNAME/人生选择器)
- **在线演示**: [GitHub Pages](https://YOUR_USERNAME.github.io/人生选择器/)
- **问题反馈**: [Issues](https://github.com/YOUR_USERNAME/人生选择器/issues)

---

⭐ 如果这个项目对您有帮助，请给个 Star！

Made with ❤️ by Rain

