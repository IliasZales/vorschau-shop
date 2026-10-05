import type { Product } from "./shopTypes";

export const products: Product[] = [
  {
    id: "atelier-lampe-01",
    slug: "atelier-lampe-no-1",
    name: "Atelier Lampe No. 1",
    tagline: "Handgefertigte Designerleuchte für zurückhaltende Räume",
    description:
      "Die Atelier Lampe No. 1 vereint zeitlose Form mit warmem Licht. Jede Leuchte wird in kleiner Serie gefertigt, mit einem Schirm aus natürlicher Leinenmischung und einem Gestell aus gebürstetem Stahl. Sie spendet ein angenehm diffuses Licht, das Arbeits- und Wohnräume gleichermaßen aufwertet – ohne zu blenden und ohne laut zu sein.",
    price: 349,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      "Handgefertigter Leinenschirm in Naturtone",
      "Dimmbares, warmweißes LED-Modul (2700 K)",
      "Gestell aus gebürstetem Stahl",
      "Kabel aus Textilgeflecht in Schwarz",
      "Inklusive Fußschalter",
    ],
    specs: [
      { label: "Höhe", value: "148 cm" },
      { label: "Schirmdurchmesser", value: "38 cm" },
      { label: "Leistung", value: "12 W LED" },
      { label: "Farbtemperatur", value: "2700 K" },
      { label: "Gewicht", value: "4,2 kg" },
      { label: "Lieferzeit", value: "3–5 Werktage" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(price);
}
