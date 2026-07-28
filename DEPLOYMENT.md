# 国内长期部署

正式演示地址：

https://agent-demo-portfolio-hexagon-17-d1go2pjk944dd7a84.webapps.tcloudbase.com/

网站部署在腾讯云 CloudBase 静态网站托管，当前为 React + Vite 的纯静态演示，
不依赖本地电脑、付费模型或境外 API。

## CloudBase 部署配置

```text
项目框架：React / Vite
运行时环境：Node.js 22
目标目录：./
安装命令：npm install
构建命令：npm run build
构建产物目录：./dist
部署路径：/
环境变量：留空
```

部署成功后，日志应包含 `Successfully uploaded`、`Deployment complete` 和
`Finished, code: 0`。

## 本地构建

```powershell
pnpm install
pnpm build
pnpm preview
```

## 维护说明

- 更新源码后需要在 CloudBase 新建版本或重新部署。
- 首页文档保持为 `index.html`。
- 默认域名适合求职演示，但可能存在访问频率限制。
- 当前托管资源到期前需要续期；生产长期使用建议绑定已备案的自定义域名。
- 对外部署包不得包含 `.env`、个人照片、联系方式或本地运行数据。
