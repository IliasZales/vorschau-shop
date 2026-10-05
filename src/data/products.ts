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
  {
    id: "atelier-lampe-02",
    slug: "atelier-lampe-no-2",
    name: "Atelier Lampe No. 2",
    tagline: "Kompakte Tischleuchte mit warmem, gerichtetem Licht",
    description:
      "Die Atelier Lampe No. 2 ist die kompakte Schwester der No. 1. Ihr schlanker Fuß aus Eschenholz trägt einen Schirm aus naturweißem Leinen, der das Licht gezielt auf Schreibtisch oder Nachttisch lenkt. Jede Leuchte wird in kleiner Serie gefertigt und passt auf jede Ablage, ohne den Raum zu dominieren.",
    price: 289,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532344214108-1b6d425db572?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      "Fuß aus geöltem Eschenholz",
      "Schirm aus naturweißem Leinen",
      "Dimmbares, warmweißes LED-Modul (2700 K)",
      "Schalter direkt am Gestell",
      "Inklusive Netzkabel mit Textilummantelung",
    ],
    specs: [
      { label: "Höhe", value: "52 cm" },
      { label: "Schirmdurchmesser", value: "24 cm" },
      { label: "Leistung", value: "7 W LED" },
      { label: "Farbtemperatur", value: "2700 K" },
      { label: "Gewicht", value: "1,8 kg" },
      { label: "Lieferzeit", value: "3–5 Werktage" },
    ],
  },
  {
    id: "atelier-stehleuchte-03",
    slug: "atelier-stehleuchte-no-3",
    name: "Atelier Stehleuchte No. 3",
    tagline: "Großzügige Stehleuchte für Lese- und Wohnecken",
    description:
      "Die Atelier Stehleuchte No. 3 bringt warmes Licht in Lese- und Wohnecken. Ein schlankes Gestell aus Messing trägt einen großen Schirm aus Leinenmischung, der ein weiches, gleichmäßiges Licht in den Raum streut. Die Leuchte ist in kleiner Serie handgefertigt und lässt sich dank Fußschalter bequem vom Sofa aus bedienen.",
    price: 429,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1759647020559-2f91a4290ae4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630578877871-1a2f9d372fd2?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      "Handgefertigter Leinenschirm in Sandton",
      "Gestell aus Messing, matt lackiert",
      "Dimmbares, warmweißes LED-Modul (2700 K)",
      "Kabel aus Textilgeflecht in Schwarz",
      "Inklusive Fußschalter",
    ],
    specs: [
      { label: "Höhe", value: "162 cm" },
      { label: "Schirmdurchmesser", value: "45 cm" },
      { label: "Leistung", value: "15 W LED" },
      { label: "Farbtemperatur", value: "2700 K" },
      { label: "Gewicht", value: "6,5 kg" },
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
