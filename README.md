# Evan 的全球账户

一个已经部署到 Cloudflare Pages 的纯静态中文个人品牌网站，主题包括全球账户体系、美国信用记录、美国信用卡、ITIN 与实用工具。

正式访问地址：

- 自定义域名：<https://evan.tuomuyifa.dpdns.org>
- Cloudflare Pages 默认地址：<https://evan-global-account.pages.dev>

## 文件结构

```text
index.html
about.html
credit-cards.html
itin-credit.html
tools.html
articles.html
contact.html
assets/css/style.css
assets/js/main.js
README.md
```

## 本地预览

这个网站不需要构建工具，可以直接打开 `index.html`。

如果希望用本地静态服务器预览，可以在项目根目录运行：

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```

## 提交到 GitHub

如果你在本地修改了文件，可以按下面流程提交：

```bash
git add .
git commit -m "Build static personal brand website"
git push origin main
```

## Cloudflare Pages 部署状态

网站已经成功部署到 Cloudflare Pages，并已绑定自定义域名：

```text
https://evan.tuomuyifa.dpdns.org
```

默认 Pages 地址：

```text
https://evan-global-account.pages.dev
```

## Cloudflare Pages 推荐设置

```text
Framework preset: None / Static HTML
Build command: 留空
Build output directory: /
Root directory: 默认
Environment variables: 不需要
```

## 后续添加文章

第一版把主题页直接放在根目录，方便 Cloudflare Pages 直接部署。后续可以继续新增类似 `new-article.html` 的页面，并在 `articles.html` 里加入链接。

## 免责声明

本网站内容仅为个人经验分享和信息整理，不构成金融、税务、法律或投资建议。申请金融产品前，请以官方信息为准，并根据自身情况判断。
