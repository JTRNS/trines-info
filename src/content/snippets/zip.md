---
lang: typescript
description: Zip two arrays together into an array of pairs, stopping at the shorter one.
pubDate: 2026-03-25
---

const zip = <A, B>(a: A[], b: B[]): [A, B][] =>
Array.from({ length: Math.min(a.length, b.length) }, (\_, i) => [a[i], b[i]]);
