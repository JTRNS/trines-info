---
title: "De Astro Content Layer API: collecties zonder beperkingen"
description: "Astro 5.0 vervangt de oude content collections met een flexibele Content Layer API. Je kunt nu data laden vanuit elk denkbaar bron — van Markdown-bestanden tot externe API's."
pubDate: 2026-03-01
author: "Trine"
tags: ["astro", "content-layer", "javascript", "static-site"]
featured: true
---

Astro 5.0 introduceerde een fundamentele herinrichting van het content-systeem: de **Content Layer API**. Waar de oude `defineCollection` je beperkte tot bestanden in `src/content/`, kun je nu met loaders data ophalen vanuit elke gewenste bron.

## Hoe de nieuwe API eruitziet

De configuratie verhuist van `src/content/config.ts` naar `src/content.config.ts` (direct in `src/`). De kern is de `loader`-optie:

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

De `glob`-loader is de ingebouwde vervanger voor het oude bestandsgebaseerde systeem. Maar je kunt ook custom loaders schrijven.

## Een custom loader voor een externe API

Stel je haalt berichten op uit een headless CMS:

```typescript
import type { Loader } from "astro/loaders";

const cmsLoader: Loader = {
  name: "cms-loader",
  async load({ store, logger }) {
    logger.info("Berichten ophalen uit CMS...");
    const res = await fetch("https://mijn-cms.nl/api/posts");
    const posts = await res.json();

    store.clear();
    for (const post of posts) {
      store.set({ id: post.slug, data: post });
    }
  },
};
```

Door `store.clear()` te roepen voor elke build zorg je ervoor dat verwijderde berichten ook daadwerkelijk uit de collectie verdwijnen.

## Data opvragen in pagina's

De query-API is nagenoeg hetzelfde als voorheen:

```astro
---
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
const gesorteerd = posts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
---
```

## Voordelen ten opzichte van de oude aanpak

| Aspect               | Oud systeem                  | Content Layer               |
| -------------------- | ---------------------------- | --------------------------- |
| Databronnen          | Alleen lokale bestanden      | Bestanden, API's, databases |
| Configuratielocatie  | `src/content/config.ts`      | `src/content.config.ts`     |
| Loaders              | Ingebouwd, niet uitbreidbaar | Volledig pluggable          |
| Incrementele updates | Niet ondersteund             | Via `store.set()` mogelijk  |

## Conclusie

De Content Layer API maakt Astro aanzienlijk flexibeler als data-laag. Of je nu Markdown-bestanden, een headless CMS of een eigen database gebruikt: het schema-validatiemechanisme via Zod blijft consistent. Dat is precies de kracht van de aanpak.
