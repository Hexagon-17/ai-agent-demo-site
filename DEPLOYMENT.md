# 国内长期部署

本项目使用腾讯 EdgeOne Makers 托管，生产项目名为
`ai-agent-application-lab`，加速区域选择全球可用区。

## 推荐部署方式

1. 将本仓库导入 EdgeOne Makers。
2. 将 `main` 设置为 Production 关联分支。
3. 使用 `pnpm install` 安装依赖，使用 `pnpm build` 构建。
4. 将输出目录设置为 `dist`。
5. 在环境管理中启用 Production 固定域名。

推送到 `main` 后，平台会自动构建并更新同一个生产地址。单次部署详情页生成的
带 `eo_token` 链接属于临时预览地址，不应作为简历或招聘平台的长期链接。

## 本地构建

```powershell
pnpm install
pnpm build
pnpm preview
```

## 命令行直接发布

```powershell
node node_modules/edgeone/edgeone-bin/edgeone.js makers deploy .\dist `
  --name ai-agent-application-lab `
  --env production `
  --area global
```

命令行发布可以更新生产部署，但最终对外分享的地址应以 EdgeOne 控制台
“环境管理”中显示的 Production 域名为准。
