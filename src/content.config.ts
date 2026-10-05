import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const settings = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/settings",
  }),
  schema: z.object({
    websiteUrl: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    mapUrl: z.string(),
    formspark: z.string(),
    adress: z.object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    }),
    instagram: z.string(),
    taxnumber: z.string(),
    name: z.string(),
    companyName: z.string(),
  }),
});

export const collections = {
  settings,
};
