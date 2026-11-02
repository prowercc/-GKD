# src/apps 目录说明

此目录只放应用规则源码，每个文件必须以 Android 包名命名，并与导出的 id 一致，例如：

```text
src/apps/com.zhihu.android.ts
src/apps/tv.danmaku.bili.ts
src/apps/com.MobileTicket.ts
```

不要使用 `zhihu.ts` 这样的简称，也不要放 README、草稿或占位文件。缺少整个目录时可构建空订阅；目录内的错误文件仍会被校验拒绝。

规则模板见 [app-rule-template.ts.txt](app-rule-template.ts.txt)。规则组名称必须匹配已有类别名称或以“类别名称-场景”开头；当前类别见 `src/categories.ts`。
