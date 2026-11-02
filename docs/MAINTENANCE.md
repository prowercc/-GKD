# 日常维护与发布

## 修复流程

1. 提供应用名和版本、GKD 版本、手机系统、具体故障和对应规则组。
2. 在失效页面捕获 GKD 快照。多步操作需分别抓取；保存容易误触的正常页面作为反例。
3. 编辑 `src/apps/包名.ts`，比较控件属性、页面、版本条件和触发时机。已有 group/rule key 保持稳定。
4. 在审查工具验证正例和反例，手机测试成功后运行校验和测试。
5. 提交到分支，PR 进行校验；合并或直接提交到 main 会自动发布。
6. 等待 [Build and publish](https://github.com/prowercc/-GKD/actions/workflows/build.yml) 成功，再在手机刷新订阅并确认。

## 自动发布如何工作

- 校验阶段：安装锁定依赖、类型与规则检查、11 项回归测试、Lint、格式检查、构建。
- 发布阶段：只在 main 运行，以构建产物与已有订阅比较，内容改变时递增版本。
- 将 `dist/` 回写 main，创建对应的 GitHub Release，附上订阅和版本文件。
- 内容未改变时不会增加版本；Release 缺失时可用手动运行重试补建。
- PR 不写入远程，也不创建 Release；工作流限制同一分支并发，推送不使用 force。
- 在工作流页面的 Run workflow 可以手动重试。初期无需 npm 账号或 npm Token。

发布阶段使用仓库自带 GITHUB_TOKEN，仅授予 contents: write；组织策略或分支保护可能需要仓库管理员进一步配置。

## 本地命令

```powershell
pnpm install --frozen-lockfile
pnpm run check
pnpm test
pnpm run lint:check
pnpm run format:check
pnpm run build
```

`pnpm run format` 和 `pnpm run lint` 会修改文件。提交前检查 diff，避免把与本次修复无关的更改一起提交。

正常只需提交规则源码和相关说明，服务器负责更新 `dist/gkd.json5`、`dist/gkd.version.json5`、变更记录与适配应用列表。本地构建用于验证，需要手工发布时应一起提交这些生成文件。

## 校验的边界

语法正确不等于手机上有效。现有检查覆盖四种选择器字段和部分链接格式，未自动下载全部历史快照进行匹配回归，也未覆盖不同手机版本的实际点击行为。

自动化能检查代码并发布，无法仅凭应用更新通知自动推断新按钮的位置。新增规则必须来自真实页面证据。

## 误触与回退

先停用误触规则，再修复或回退源码并发布更高版本。直接把远端版本降低，手机不会将其识别为更新。

使用独立订阅 ID 20260418；不要在后续发布中随意更改这个 ID。原订阅 666 的开关设置不会自动迁移。
