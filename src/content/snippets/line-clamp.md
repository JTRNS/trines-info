---
lang: css
description: A utility class that clamps text to a set number of lines with an ellipsis.
pubDate: 2026-03-10
---

.line-clamp {
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: var(--lines, 3);
overflow: hidden;
}
