# 贡献说明

欢迎为擦擦GKD 修复或补充有真实页面依据的规则。问题反馈使用仓库的 [Issue 表单](https://github.com/prowercc/-GKD/issues/new/choose)。

## 提交内容

- 优先按一个应用或一个明确场景组织改动，说明此前的表现和修改后的行为。
- 编辑 `src/apps/完整包名.ts`，保留已有 key、来源注释及仍有用的历史快照。
- 提供应用/GKD/系统版本、新版快照、正常页面反例，以及实际测试结果。
- PR 中区分“静态匹配已检查”和“真机已验证”，没有真机结果时如实注明。

## 提交前检查

```powershell
pnpm run check
pnpm test
pnpm run lint:check
pnpm run format:check
pnpm run build
```

日常提交源码与相关说明，`dist/` 由主分支的发布工作流生成。对维护工具和发布流程的改动，也应说明验证方式。

详细流程见 [规则编写](docs/WRITING_RULES.md) 与 [维护发布](docs/MAINTENANCE.md)。
