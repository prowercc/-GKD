import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 20260418,
  name: '擦擦GKD',
  version: 0,
  author: 'caca',
  updateUrl:
    'https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.json5',
  checkUpdateUrl:
    'https://raw.githubusercontent.com/prowercc/-GKD/main/dist/gkd.version.json5',
  supportUri: 'https://github.com/prowercc/-GKD',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
