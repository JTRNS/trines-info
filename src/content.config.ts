import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    type: z.literal("blog").default("blog"),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Jeroen Trines"),
    tags: z.array(z.string()).default(["overig"]),
    featured: z.boolean().default(false),
  }),
});

const links = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/links" }),
  schema: z.object({
    type: z.literal("link").default("link"),
    url: z.string().url(),
    note: z.string().max(240).default(""),
    pubDate: z.coerce.date(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
  schema: z.object({
    type: z.literal("snippet").default("snippet"),
    lang: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog, links, snippets };
