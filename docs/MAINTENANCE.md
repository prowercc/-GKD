# 日常维护流程

## 新增一条规则

1. 手机生成快照链接。
2. 在 `src/apps/` 新建或编辑对应 App 文件。
3. 写规则，保留 `snapshotUrls`。
4. 本地检查：

```powershell
pnpm run check
```

5. 构建订阅：

```powershell
pnpm run build
```

6. 提交并推送：

```powershell
git add .
git commit -m "feat: add app rule"
git push
```

7. 手机 GKD 下拉更新订阅。

## 修改已有规则

1. 找到对应 `src/apps/*.ts`。
2. 添加新的快照到 `snapshotUrls`。
3. 优先让选择器更稳，不要为了“能触发”无限放宽。
4. 跑检查和构建。

## 版本文件

构建会生成：

- `dist/gkd.json5`
- `dist/gkd.version.json5`
- `dist/CHANGELOG.md`
- `dist/README.md`

这些文件需要一起提交。GKD 订阅读取 `dist/gkd.json5`。

## 如果 hook 找不到 pnpm

先激活 Cursor 里的本地环境：

```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
& C:\Users\caca\Desktop\Cursor\EnvConfig\activate.ps1
```

然后重新执行 Git 命令。
