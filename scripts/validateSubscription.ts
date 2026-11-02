import type {
  RawGlobalRule,
  RawRuleProps,
  RawSubscription,
} from '@gkd-kit/api';
import { checkSubscription } from '@gkd-kit/tools';

const toArray = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

// tools@0.8.0 only parses matches/excludeMatches. Route the other selector
// fields through the same parser, including its Java/Kotlin regex checks.
export const validateSubscription = (subscription: RawSubscription) => {
  checkSubscription(subscription);
  const extraRules: RawGlobalRule[] = [];
  const append = (rule: RawRuleProps, context: string) => {
    for (const field of ['anyMatches', 'excludeAllMatches'] as const) {
      toArray(rule[field]).forEach((selector, index) => {
        extraRules.push({
          key: extraRules.length,
          name: `${context} ${field}[${index}]`,
          matches: selector,
        });
      });
    }
  };
  for (const group of subscription.globalGroups ?? []) {
    group.rules.forEach((rule, index) =>
      append(rule, `global[${group.key}] rule[${index}]`),
    );
  }
  for (const app of subscription.apps ?? []) {
    for (const group of app.groups ?? []) {
      toArray(group.rules).forEach((rule, index) => {
        if (typeof rule !== 'string') {
          append(rule, `${app.id} group[${group.key}] rule[${index}]`);
        }
      });
    }
  }
  if (extraRules.length) {
    checkSubscription({
      id: subscription.id,
      name: subscription.name,
      version: subscription.version,
      globalGroups: [{ key: 0, name: '补充选择器校验', rules: extraRules }],
    });
  }
};
