# GKD 规则编写入门

这份文档的目标不是一次学完全部语法，而是让你能从一个真实弹窗开始，写出一条自己看得懂、以后能维护的规则。

## 1. 先拿到快照

在手机 GKD 里打开快照/审查工具，对准你想处理的界面生成快照链接。

快照链接通常长这样：

```txt
https://i.gkd.li/i/12345678
```

写规则前先问自己三件事：

- 我想点哪个按钮？
- 这个按钮有什么稳定特征？例如 `text`、`desc`、`vid`。
- 这个界面有没有相似按钮，可能误点吗？

## 2. 找最稳定的目标

优先级大致是：

1. `vid`：控件资源 id，通常最稳定。
2. `text`：按钮文字，例如“跳过”“关闭”“暂不”。
3. `desc`：无障碍描述，例如“关闭”。
4. 位置和结构关系：最后再用，因为版本变化时更容易失效。

常见选择器：

```txt
[text="跳过"]
[text*="跳过"]
[desc="关闭"]
[vid="iv_close"]
[text="暂不更新"][visibleToUser=true]
```

## 3. 新建一个 App 规则文件

例如要给知乎写规则，新建：

```txt
src/apps/zhihu.ts
```

起步模板：

```ts
import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.zhihu.android',
  name: '知乎',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      desc: '点击跳过',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: '[text*="跳过"][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/替换成你的快照编号',
        },
      ],
    },
  ],
});
```

## 4. 先检查，再构建

```powershell
pnpm run check
pnpm run build
```

`check` 通过后，再把 `dist/gkd.json5` 推到 GitHub。手机订阅链接就会读到新版本。

## 5. 常见规则字段

- `id`：Android 包名，例如 `com.zhihu.android`。
- `name`：App 名。
- `groups`：规则组列表。
- `key`：同一个 App 内唯一编号，从 0 开始。
- `name`：规则组名称，建议写清楚场景。
- `rules`：真正的匹配规则。
- `matches`：选择器，决定匹配哪个节点。
- `snapshotUrls`：快照链接，必须留。
- `fastQuery`：常用优化，适合简单选择器。
- `matchTime`：进入界面后持续匹配多久，单位毫秒。
- `actionMaximum`：最多执行几次，防止重复点击。
- `resetMatch`：常用 `app`，切换 App 后重置匹配状态。

## 6. 少写全局规则

全局规则会跨 App 生效，容易误触。个人订阅建议优先写 App 规则，只有非常确定的通用场景再放到 `src/globalGroups.ts`。

## 7. 调试顺序

1. 先写最简单选择器。
2. 跑 `pnpm run check`。
3. 跑 `pnpm run build`。
4. 推送到 GitHub。
5. 手机 GKD 下拉更新订阅。
6. 看是否触发。
7. 如果误触，加更严格条件，例如 `activityIds`、父子关系、`visibleToUser=true`。

## 8. 参考资料

- 订阅规则：https://gkd.li/guide/subscription
- API 文档：https://gkd.li/api/
- 选择器语法：https://gkd.li/guide/selector
- 查询优化：https://gkd.li/guide/selector/query
