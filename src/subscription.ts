import { defineGkdSubscription } from '@gkd-kit/define';
import categories from './categories';
import globalGroups, { OPEN_AD_ORDER } from './globalGroups';
import { loadApps } from './loadApps';

const apps = await loadApps(`${import.meta.dirname}/apps`);
for (const app of apps) {
  for (const group of app.groups ?? []) {
    if (group.name.startsWith('开屏广告')) group.order = OPEN_AD_ORDER;
  }
}

export default defineGkdSubscription({
  id: 20260418,
  name: '擦擦GKD',
  version: 0,
  author: 'prowercc',
  updateUrl:
    'https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.json5',
  checkUpdateUrl:
    'https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.version.json5',
  supportUri: 'https://github.com/prowercc/-GKD/issues',
  categories,
  globalGroups,
  apps,
});
