# GitHub Pages 部署指南

## 🚀 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，只需以下步骤：

### 1. 创建 GitHub 仓库

```bash
# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/人生选择器.git
git branch -M main
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Source** 下选择 **GitHub Actions**
3. 保存设置

### 3. 配置仓库名称

如果您的仓库名称不是 `人生选择器`，需要修改 `vite.config.js` 中的 `base` 配置：

```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/YOUR_REPO_NAME/',  // 修改为您的仓库名
  // ...
})
```

### 4. 推送代码触发部署

```bash
git add .
git commit -m "Update configuration"
git push
```

推送后，GitHub Actions 会自动构建和部署项目。

### 5. 访问网站

部署完成后，访问：
```
https://YOUR_USERNAME.github.io/人生选择器/
```

---

## 📝 手动部署

如果不想使用 GitHub Actions，可以手动部署：

### 1. 构建项目

```bash
npm install
npm run build
```

### 2. 创建 gh-pages 分支

```bash
# 安装 gh-pages 工具
npm install -D gh-pages

# 添加部署脚本到 package.json
# "deploy": "gh-pages -d dist"

# 执行部署
npm run deploy
```

### 3. 配置 GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Source** 下选择分支 **gh-pages**
3. 选择根目录 **/ (root)**
4. 保存设置

---

## ⚙️ 自定义域名（可选）

### 1. 添加 CNAME 文件

在 `public` 目录下创建 `CNAME` 文件，内容为您的域名：

```
your-domain.com
```

### 2. 配置 DNS

在您的域名服务商处添加 CNAME 记录：

```
类型: CNAME
主机记录: @（或 www）
记录值: YOUR_USERNAME.github.io
```

### 3. 在 GitHub 设置自定义域名

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Custom domain** 输入您的域名
3. 勾选 **Enforce HTTPS**
4. 保存设置

---

## 🔧 常见问题

### Q1: 部署后页面空白或资源404

**A:** 检查 `vite.config.js` 中的 `base` 配置是否正确。应该设置为：
```javascript
base: '/仓库名称/'
```

### Q2: GitHub Actions 构建失败

**A:** 检查以下几点：
1. `package.json` 中的依赖是否完整
2. Node.js 版本是否兼容（推荐使用 Node 18+）
3. 查看 Actions 日志获取具体错误信息

### Q3: 如何更新网站内容

**A:** 直接修改代码并推送到 main 分支：
```bash
git add .
git commit -m "Update content"
git push
```
GitHub Actions 会自动重新部署。

### Q4: 如何本地预览生产版本

**A:** 运行以下命令：
```bash
npm run build
npm run preview
```

---

## 📚 相关文档

- [Vite 部署文档](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

---

## 💡 提示

- 首次部署可能需要几分钟时间
- 每次推送代码都会触发自动部署
- 部署状态可以在仓库的 **Actions** 标签页查看
- 建议在 `README.md` 中添加在线访问链接

