// src/lib/sanityClient.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"; // <-- YENİ EKLENEN SATIR

export const client = createClient({
  projectId: "af7r4ule", // Buranın doğru olduğundan emin ol
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-07-03",
});

// Sanity görsellerini kullanmak için bir yardımcı fonksiyon
const builder = imageUrlBuilder(client);
export function urlFor(source: any) { // <-- YENİ EKLENEN FONKSİYON
  return builder.image(source);
}