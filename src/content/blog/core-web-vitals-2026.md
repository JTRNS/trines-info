---
title: "Core Web Vitals in 2026: INP is de nieuwe bottleneck"
description: "Interaction to Next Paint (INP) verving CLS als Google-rankingfactor. We kijken hoe je INP meet, begrijpt en verbetert in moderne webapplicaties."
pubDate: 2026-01-22
author: "Trine"
tags: ["performance", "core-web-vitals", "inp", "browser"]
---

Sinds maart 2024 is **Interaction to Next Paint (INP)** de officiële vervanging van First Input Delay (FID) binnen de Core Web Vitals. Wie zijn Lighthouse-score nog niet heeft bijgewerkt, loopt inmiddels achter. In dit artikel leggen we uit wat INP precies meet en hoe je er praktisch mee aan de slag gaat.

## Wat meet INP?

INP meet de **totale latentie** van een interactie: van het moment dat een gebruiker klikt, typt of een touchevent triggert, tot het moment dat de browser de bijbehorende visuele update heeft gerenderd. Anders dan FID meet INP niet alleen de eerste interactie, maar het **slechtste percentiel** van alle interacties gedurende een sessie.

Drempelwaarden:

- **Goed**: ≤ 200 ms
- **Verbetering nodig**: 200–500 ms
- **Slecht**: > 500 ms

## Veelvoorkomende oorzaken van een hoge INP

### 1. Lange taken op de main thread

De browser kan geen frame renderen zolang er een lange taak loopt. Splits zware JavaScript-taken op met `scheduler.yield()` (of de oudere `setTimeout(..., 0)`-truc):

```javascript
async function verwerkLijst(items) {
  for (const item of items) {
    verwerk(item);
    await scheduler.yield(); // geef de browser ruimte om te renderen
  }
}
```

### 2. Onnodige re-renders in frameworks

React, Vue en Svelte genereren soms meer re-renders dan nodig. Gebruik `useMemo`, `derived` of `$derived` om berekeningen te memoïzeren en onnodige DOM-updates te vermijden.

### 3. Synchrone layout-thrashing

Het afwisselend lezen en schrijven van DOM-properties dwingt de browser tot herhaald reflow:

```javascript
// Slecht
elements.forEach((el) => {
  const hoogte = el.offsetHeight; // leest layout
  el.style.height = hoogte + 10 + "px"; // schrijft layout → forceer reflow
});

// Beter: eerst lezen, dan schrijven
const hoogtes = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => (el.style.height = hoogtes[i] + 10 + "px"));
```

## Meten in de praktijk

Gebruik de [Web Vitals JavaScript-bibliotheek](https://github.com/GoogleChrome/web-vitals) voor real-user monitoring:

```javascript
import { onINP } from "web-vitals";

onINP(({ value, rating, attribution }) => {
  console.log(`INP: ${value}ms (${rating})`);
  // Stuur naar je analytics-endpoint
});
```

## Conclusie

INP geeft een eerlijker beeld van de ervaren interactiviteit dan FID ooit kon. Investeren in een lage INP loont niet alleen voor SEO, maar ook voor gebruikerstevredenheid — en die twee gaan steeds meer hand in hand.
