import fs from 'node:fs/promises';
import type { RawApp } from '@gkd-kit/api';
import { batchImportApps } from '@gkd-kit/tools';

const collator = new Intl.Collator('zh-Hans-CN', { sensitivity: 'accent' });
const sortName = (app: RawApp) => {
  const name = app.name || app.id;
  const ascii = [...name].every((character) => character.charCodeAt(0) <= 127);
  return ascii ? name : '\uFFFF' + name;
};

export const sortApps = (apps: RawApp[]) =>
  apps.sort((a, b) => {
    const byName = collator.compare(sortName(a), sortName(b));
    return byName || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  });

export const loadApps = async (directory: string) => {
  try {
    await fs.access(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  return sortApps(await batchImportApps(directory));
};
