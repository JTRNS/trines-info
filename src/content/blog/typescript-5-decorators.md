---
title: "TypeScript 5.0 Decorators: Eindelijk een stabiele standaard"
description: "TypeScript 5.0 introduceert officieel ondersteuning voor de TC39 decorator-standaard. We bekijken wat er veranderd is en hoe je decorators toepast in moderne TypeScript-projecten."
pubDate: 2026-02-10
author: "Trine"
tags: ["typescript", "javascript", "decorators", "tc39"]
---

Met de release van TypeScript 5.0 werd een lang verwacht moment bereikt: officiële ondersteuning voor de [TC39 decorator-proposal](https://github.com/tc39/proposal-decorators), inmiddels in Stage 3. Wie al jaren werkt met het oude `experimentalDecorators`-gedrag, zal merken dat er het nodige veranderd is.

## Wat zijn decorators?

Decorators zijn een syntactische uitbreiding waarmee je klassen, methoden, accessors, velden en parameters kunt annoteren en aanpassen. Ze zijn vergelijkbaar met annotaties in Java of attributes in C#, maar in JavaScript zijn ze volledig uitvoerbare functies die op het prototype of de klasse werken.

```typescript
function log(target: any, context: ClassMethodDecoratorContext) {
  return function (...args: unknown[]) {
    console.log(`Methode ${String(context.name)} aangeroepen`);
    return (target as Function).apply(this, args);
  };
}

class ApiClient {
  @log
  fetchData(url: string) {
    return fetch(url);
  }
}
```

## Breuk met `experimentalDecorators`

De nieuwe decorator-standaard is **niet achterwaarts compatibel** met `experimentalDecorators`. De voornaamste verschillen:

- Decorator-functies ontvangen nu een `context`-object in plaats van `target, key, descriptor`.
- Parameter-decorators zijn (voorlopig) niet opgenomen in de TC39-standaard.
- De volgorde van uitvoering verschilt in bepaalde gevallen.

Bestaande frameworks zoals Angular en NestJS die zwaar leunen op het oude gedrag, hebben migratiepaden uitgebracht — maar controleer je versies voordat je upgradet.

## Inschakelen in `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": false
  }
}
```

Laat `experimentalDecorators` weg of zet het expliciet op `false` om de nieuwe standaard te gebruiken.

## Conclusie

De TC39-decorators zijn een grote stap voorwaarts voor de taal. De standaard is stabieler, beter gespecificeerd en wordt uiteindelijk native door browsers ondersteund. Voor nieuwe projecten is dit het moment om de overstap te maken.
