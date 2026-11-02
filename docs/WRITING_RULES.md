# 编写和修复规则

擦擦GKD 按应用维护规则。开始前先获取故障快照，并检查 `src/apps/` 是否已有对应包名的文件。

## 1. 获取可审查的页面证据

在 GKD 开启无障碍服务，使用“捕获快照”保存故障页面。快照包含截图、应用/页面信息和节点树。

可以提供快照 ZIP，或通过审查工具的分享功能生成 `/i/` 形式的链接。`/snapshot/` 是当前浏览器的本地地址，其他人无法使用。公开分享前检查截图和节点文字中的个人信息。

多步关闭流程分别保存各步骤；同时保存容易误触的正常页面。详见 [官方快照说明](https://gkd.li/guide/snapshot)。

## 2. 定位目标和上下文

在 [审查工具](https://i.gkd.li/) 中查看目标的 `id`、`vid`、`text`、`desc`、可见状态和相邻节点。

优先使用经过快照确认、足以区分目标的属性。单一文字在多个页面出现时，应结合页面或周边节点收窄范围。长层级关系、宽泛文字和固定坐标需要更多反例验证。

例如，下面只是选择器语法示意，属性值必须替换为实际快照中的内容：

```text
[vid="splash_skip"][visibleToUser=true]
[text="暂不更新"][visibleToUser=true]
```

## 3. 编辑应用文件

已有应用继续编辑原文件；新应用以完整包名命名，例如 `src/apps/com.example.app.ts`，并确保文件名与导出的 `id` 一致。

下面是结构示例，`com.example.app`、页面名、控件 ID 和快照地址都是占位内容，不能直接作为已适配规则使用：

```ts
import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.example.app',
  name: '示例应用',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      fastQuery: true,
      activityIds: '.SplashActivity',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          key: 0,
          matches: '[vid="splash_skip"][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/替换为真实快照编号',
        },
      ],
    },
  ],
});
```

可复制 [规则模板](app-rule-template.ts.txt) 起步。新增 group key 应在该应用内唯一，rule key 应在该规则组内唯一；修复旧规则时保留已有标识。

规则组名称使用 `src/categories.ts` 中的类别名称，或采用“类别名称-具体场景”，例如“全屏广告-首页活动弹窗”。

## 4. 了解关键字段

| 字段                                   | 用途                                               |
| -------------------------------------- | -------------------------------------------------- |
| `activityIds` / `excludeActivityIds`   | 限定或排除页面；页面条件也需要随应用更新检查       |
| `matches`                              | 所有选择器都须匹配，动作作用于最后一个选择器的目标 |
| `anyMatches`                           | 一组替代匹配条件                                   |
| `excludeMatches` / `excludeAllMatches` | 排除可能误触的场景                                 |
| `preKeys`                              | 让多步操作按前置规则的执行顺序触发                 |
| `matchTime` / `actionMaximum`          | 控制匹配时间与执行次数                             |
| `actionCd` / `resetMatch`              | 控制执行间隔与规则状态重置                         |
| `snapshotUrls`                         | 保存规则依据，方便后续排查                         |

`matches`、`anyMatches` 等都不是点击步骤列表；多步动作使用独立规则和 `preKeys`。完整语义以 [GKD API](https://gkd.li/api/) 为准。

## 5. 验证与提交

1. 在快照中确认命中目标，并在正常页面反例中确认不会误触。
2. 手机临时测试，检查点击效果、执行次数和前后页面。
3. 运行 `pnpm run check`、`pnpm test`、Lint、格式检查和构建。
4. 提交源码和必要说明；在 PR 中写清触发场景、修改原因、应用版本和真机结果。
5. 等待合并和自动发布，手机刷新后复验。

仅能在审查工具匹配到节点时，还需排查实时事件范围、页面限制、延迟和规则休眠状态。全局规则影响多个应用，应提供覆盖面更广的正反例，并先考虑是否能用应用规则解决。

## 参考

- [订阅格式](https://gkd.li/guide/subscription)
- [API 字段](https://gkd.li/api/)
- [选择器语法](https://gkd.li/guide/selector)
- [查询优化](https://gkd.li/guide/selector/query)
