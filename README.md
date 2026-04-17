# 擦擦GKD

这是一个从零开始维护的个人 GKD 订阅项目，不再整包搬运旧的停更订阅。

## 订阅链接

在 GKD 中添加：

```txt
https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.json5
```

备用版本检查文件：

```txt
https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.version.json5
```

## 项目结构

- `src/subscription.ts`：订阅名称、作者、更新链接等元信息。
- `src/categories.ts`：规则分类，例如开屏广告、弹窗广告、功能辅助。
- `src/globalGroups.ts`：全局规则。先保持为空，减少误触风险。
- `src/apps/`：每个 App 一个规则文件，日常主要维护这里。
- `dist/gkd.json5`：构建后的订阅文件，手机订阅读取这个。
- `docs/WRITING_RULES.md`：规则编写入门。
- `docs/MAINTENANCE.md`：日常维护流程。

## 常用命令

```powershell
cd C:\Users\caca\Desktop\Cursor\GKD\caca-gkd

pnpm install
pnpm run check
pnpm run build
```

提交和推送：

```powershell
git add .
git commit -m "feat: update gkd rules"
git push
```

## 写规则的原则

1. 从自己的快照出发，不盲抄旧仓库规则。
2. 只为自己实际遇到的问题写规则。
3. 默认先小范围匹配，确认不误触后再放宽。
4. 每条规则保留 `snapshotUrls`，以后排查靠它。
5. 开屏广告可以默认启用，其它类别按需手动启用。

## 参考

- GKD 订阅规则文档：https://gkd.li/guide/subscription
- GKD API 文档：https://gkd.li/api/
- GKD 订阅模板：https://github.com/gkd-kit/subscription-template
