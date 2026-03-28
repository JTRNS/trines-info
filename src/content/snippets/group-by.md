---
lang: typescript
description: Group an array of objects by a key. Returns a Map to preserve insertion order.
pubDate: 2026-02-18
---

const groupBy = <T, K extends PropertyKey>(
items: T[],
key: (item: T) => K,
): Map<K, T[]> =>
items.reduce((map, item) => {
const k = key(item);
map.set(k, [...(map.get(k) ?? []), item]);
return map;
}, new Map<K, T[]>());
