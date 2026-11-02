# 擦擦GKD

[![构建与发布](https://github.com/prowercc/-GKD/actions/workflows/build.yml/badge.svg)](https://github.com/prowercc/-GKD/actions/workflows/build.yml)

个人维护的 [GKD](https://gkd.li/) 订阅规则，用于在指定应用和页面执行跳过开屏、关闭广告弹窗等操作。维护重点是根据真实页面快照修复失效规则，并通过 GitHub 自动发布更新。

本项目以 [AIsouler/GKD_subscription](https://github.com/AIsouler/GKD_subscription) 的归档规则为基础，首次导入 **886 个应用、2074 个应用规则组、3 个全局规则组**。历史规则尚未逐项验证对当前应用版本的适用性；源码、校验和发布流程由本仓库继续维护。

## 添加订阅

在 GKD 的订阅页面添加以下链接：

```text
https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.json5
```

[打开订阅文件](https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.json5) · [版本检查文件](https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.version.json5) · [最新发布](https://github.com/prowercc/-GKD/releases/latest)

- 订阅名称：**擦擦GKD**
- 维护账号：**prowercc**
- 订阅 ID：`20260418`，发布后保持稳定。
- 默认仅开启“开屏广告”类别，其余类别按需手动启用。
- 从原订阅迁移时，添加本订阅后按需停用旧订阅，避免同一页面重复执行。原订阅的规则开关需要自行核对。

当前适配范围和版本以 [应用列表](dist/README.md) 与 [Release](https://github.com/prowercc/-GKD/releases) 为准。手机 GKD 刷新订阅后，只有远端版本高于本地版本才会更新。

## 规则失效时怎样反馈

在 [问题反馈](https://github.com/prowercc/-GKD/issues/new/choose) 中填写：

1. 应用名称、包名和版本，GKD 版本、手机系统。
2. 对应规则组，以及“没有触发、误触、重复点击”等具体表现。
3. 故障页面的 GKD 快照 ZIP 或可访问的审查分享链接。多步流程分别提供各步骤快照。
4. 需要点击的目标，以及容易误触的正常页面。

快照包含截图和控件节点信息，普通截图通常不足以定位选择器。公开提交前检查图片与节点文字中的个人信息。获取方式见 [GKD 快照说明](https://gkd.li/guide/snapshot)。

## 维护方式

```text
捕获故障快照 → 定位并修改应用规则 → 正例/反例与真机验证
            → 提交到 GitHub → 自动校验与发布 → 手机更新订阅
```

日常主要修改 `src/apps/包名.ts`。已有规则组和规则的 `key` 保持稳定；修复时保留来源、历史快照和适用场景说明。

GitHub Actions 会检查提交的源码、构建订阅并发布更新。应用界面变化后的适配仍需要真实页面证据和真机确认。

## 本地开发

使用 Node.js 24（见 `.node-version`）与项目指定的 pnpm 10.33.0，在克隆后的仓库根目录运行：

```powershell
pnpm install --frozen-lockfile
pnpm run check
pnpm test
pnpm run lint:check
pnpm run format:check
pnpm run build
```

PR 运行校验；合并或直接提交到 `main` 后自动发布。订阅内容变化时递增版本、更新 `dist/` 并创建 Release；只修改说明文档不会使订阅版本增加。也可在 [工作流页面](https://github.com/prowercc/-GKD/actions/workflows/build.yml) 手动运行。

`check` 和 `build` 不依赖在线版本查询；需要检查订阅 API 新版本时，单独运行 `pnpm run check:api`。

## 项目结构

| 位置                       | 内容                                         |
| -------------------------- | -------------------------------------------- |
| `src/apps/`                | 按 Android 包名划分的应用规则                |
| `src/globalGroups.ts`      | 跨应用的全局规则                             |
| `src/globalDefaultApps.ts` | 全局规则的应用名单                           |
| `src/categories.ts`        | 规则类别与默认开关                           |
| `src/subscription.ts`      | 订阅身份、更新地址与规则汇总                 |
| `scripts/`、`tests/`       | 校验、构建与维护工具的回归测试               |
| `dist/`                    | 构建生成的订阅、版本文件、变更记录与应用列表 |
| `.github/workflows/`       | GitHub 自动校验与发布流程                    |

## 文档与来源

- [维护、发布与回退](docs/MAINTENANCE.md)
- [编写和修复规则](docs/WRITING_RULES.md)
- [应用文件命名](docs/APPS_DIR.md)
- [贡献说明](CONTRIBUTING.md)
- [上游来源与首次导入范围](docs/UPSTREAM.md)

感谢 AIsouler、原项目贡献者及 [GKD 项目](https://github.com/gkd-kit)。本仓库保留上游规则中的快照、注释和来源，后续改动通过 Git 提交记录追踪。
