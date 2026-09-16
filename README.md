# Evan 的全球账户 / Evan Global Account

由 Tuomu Digital LLC 运营的中文教育品牌，聚焦美国信用、全球账户与跨境金融工具。公开文章持续更新；尚未正式销售的数字产品、工具、教育型咨询、软件及精选实物产品均明确标注状态。

- 正式网站：https://evanglobalcom.com
- 商业联系：evan@evanglobalcom.com
- GitHub：871455250-code/evan-global-account
- 托管：现有 Cloudflare Pages 项目 evan-global-account
- Pages 项目地址：https://evan-global-account.pages.dev

## 技术与部署

纯静态 HTML + CSS + JavaScript，无构建框架、数据库、用户登录、表单后端或在线支付。
继续使用现有 GitHub main 分支与 Cloudflare Pages 集成，不创建新项目。

| 设置 | 值 |
| --- | --- |
| Production branch | main |
| Framework preset | None / Static HTML |
| Build command | 留空 |
| Build output directory | / |
| Root directory | 默认 |
| Environment variables | 不需要 |

提交 main 后查看 Pages 部署结果，并以实际线上响应验证发布。自定义域名、证书和域名级重定向在 Cloudflare 控制台管理，不由此仓库自动创建。

## 文件结构

- 主要页面：index.html、articles.html、credit-cards.html、tools.html、getting-started.html、itin-credit.html、about.html、contact.html
- 产品与服务：products-services.html
- 法律信息：privacy.html、terms.html、refund.html、disclosure.html
- 10 篇正式文章：根目录独立 HTML 页面，保留原文件名、正文、视频和配图
- 样式与交互：assets/css/style.css、assets/js/main.js
- 文章配图：assets/images/ep03 至 ep10
- 搜索引擎：sitemap.xml、robots.txt
- Pages 响应头：_headers
- 未找到页面：404.html（防止未知路径被当作首页返回，排除在 sitemap 外）

## URL 规范

canonical、Open Graph、Twitter 图片和 JSON-LD 使用 https://evanglobalcom.com。
首页规范路径为 /，其他页面使用不含 .html 的最终路径，例如 /about。
仓库继续保留 .html 文件，站内导航使用相对链接；Pages 自带的 .html 跳转保持兼容。
新增页面时同步更新 sitemap.xml 和相应内容入口。保留文章真实发布时间，不凭空生成历史日期。

## 域名迁移状态

2026-09-16 已在现有 Pages 项目完成根域名及 www 绑定，三个自定义域名均显示活动且 SSL 已启用。Squarespace 的四条根域 A 记录与 www 托管 CNAME 已替换为 Pages 记录，未变更邮件或其他无关 DNS。

Cloudflare Bulk Redirect 列表 evanglobalcanonical 和规则 Evan Global Account canonical domain 已启用，精确匹配 www、旧域和生产 pages.dev。三者的 HTTP/HTTPS 请求均 301 到新站，保留 path 和 query；不包含预览子域。根域 HTTP 也会跳到 HTTPS。

## 域名维护与重定向

1. 在现有 Pages 项目 Custom domains 中绑定 evanglobalcom.com 和 www.evanglobalcom.com，确认域名与 HTTPS 证书正常。
2. 根域名和 www 的网站 DNS 指向 evan-global-account.pages.dev。只替换冲突的 Squarespace 网站 A/CNAME；保留 NS、MX、TXT 和其他无关记录。
3. 新域名全部验收后，再启用以下 301；精确匹配来源主机名，保留路径和查询参数。
   - www.evanglobalcom.com → https://evanglobalcom.com
   - evan.tuomuyifa.dpdns.org → https://evanglobalcom.com
   - evan-global-account.pages.dev → https://evanglobalcom.com
4. 新主域名不能匹配任何迁出规则。保留旧域名 DNS、证书和 Pages 绑定，让旧链接继续接收请求。
5. 在 Cloudflare Redirect Rules 或 Bulk Redirects 管理域名级迁移；不要在 _redirects 写无条件全路径回跳，避免循环。Pages 预览部署不应被生产域名规则意外覆盖。
6. 向已验证的搜索引擎站长平台提交新 sitemap，并在适用时提交站点迁移；没有访问权限时不要声称已经提交。

官方参考：
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/
- https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/

## 内容与商业边界

法定实体：Tuomu Digital LLC。对外品牌：Evan 的全球账户 / Evan Global Account。
实体名称依据运营者提供的信息，仓库不包含公司证明或私人文件。
未正式销售的项目标记 Coming Soon / 即将推出，不虚构价格、客户、销量、评价或合作关系。
Application Coaching 仅限教育与流程理解，客户本人核对并提交正式申请。

如未来存在联盟关系，应在具体推荐附近显示真实、清楚的披露，可使用 .affiliate-disclosure 样式；相应付费链接使用 rel="sponsored noopener noreferrer"。独立披露页面不能代替链接附近的说明。

## 隐私、安全与法律维护

当前页面不设置营销追踪或收集支付信息。Cloudflare 在边缘自动注入 Web Analytics 性能统计及邮箱防采集脚本，_headers 仅允许本站和官方统计脚本所需的来源，不在仓库保存统计标识或任何秘密凭据。Cloudflare 托管、隐私增强 YouTube 播放器及邮件联系仍可能处理必要信息，详见隐私政策。

Cloudflare 管理的 robots 内容保留搜索索引许可和现有 AI 训练爬虫限制；仓库的 Sitemap 声明仍指向新主域名。
禁止提交密钥、令牌、密码、身份证件、税号、银行账号或客户资料。未来需要凭据时使用平台 Secret，不写入前端或 Git 历史。
发布配图前检查打码，保留公开原图资源路径，避免误传原始敏感截图。

法律页面生效日期为 2026-09-15。正式付费上线前，应由专业人士根据公司实际所在地、销售地区、消费者权益、数据处理和交付模式复核。
当前没有在线销售，不预设退款天数；未来产品条款必须在购买前披露。

## 验收与预览

可在任意自行选择的目录直接打开静态 HTML 预览；本次维护通过 GitHub 远程提交，不依赖或修改原本地网站目录。
线上检查：首页、业务与法律页、10 篇文章、资源、手机菜单、HTTPS、规范 URL、sitemap、robots，以及三个来源域名的路径和查询参数 301。
不存在的页面应返回 404，不应伪装成首页成功响应。
