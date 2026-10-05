# Shop-Vorschau für iZ – Design-Spezifikation

## Ziel
Eine passwortgeschützte Shop-Vorschau im bestehenden Astro-Stack (iZ), die potentielle Kunden durch einen vollständigen, ästhetisch überzeugenden Beispiel-Shop führt. Der Shop demonstriert typische E-Commerce-Funktionen, ist aber zunächst ohne echte Zahlungsabwicklung (Stripe-Integration ist später an einer definierten Stelle einhängbar).

## Kontext / Stack
- Astro 7 + Tailwind CSS 4 (aus `mini-astro-starter` übernommen)
- TypeScript für Logik
- Statische Seiten mit clientseitiger Interaktivität (localStorage, Vanilla-JS-Scripts)
- `DynamicImage`-Komponente für Bilder
- Daten in `src/content/`

## Scope
- Passwort-gate für den gesamten `/shop/*`-Bereich
- Ein Beispielprodukt mit Detailseite
- Warenkorb (localStorage)
- Checkout-Seite als reine Bestellübersicht (keine echten Zahlungen)
- Test-Account-Login (Demo-Anmeldeformular)
- Passwortschutz für die Vorschau selbst

## Nicht im Scope
- Echte Backend-Authentifizierung
- Echte Zahlungsabwicklung (Stripe wird als Platzhalter vorbereitet)
- Mehrere Produkte oder Kategorien (zunächst ein Hero-Produkt)

## Seiten & Routen

| Route | Zweck |
|-------|-------|
| `/shop` | Shop-Landingpage: Hero, Produkt-Teaser, Vorteile |
| `/shop/produkt/[slug]` | Produktdetailseite (Preis, Beschreibung, Galerie, In den Warenkorb) |
| `/shop/warenkorb` | Warenkorb-Übersicht mit Mengenänderung & Entfernen |
| `/shop/checkout` | Checkout-Liste / Bestellübersicht mit Test-Account-Hinweis |
| `/shop/danke` | Danke-Seite nach simulierter Bestellung |

## Passwortschutz
- Ein einfaches clientseitiges Gate (`ShopPasswordGate.astro`) prüft ein hartcodiertes Passwort (`iz-shop-2026`).
- Bei korrektem Passwort wird ein Flag in `sessionStorage` gesetzt; der Shop-Inhalt wird eingeblendet.
- Das Gate wird auf allen `/shop/*`-Seiten eingebunden.
- **Hinweis**: Dieser Schutz ist nur für eine Kundenvorschau gedacht, keine Sicherheitslösung.

## Test-Account
- Auf der Checkout-Seite wird ein Demo-Login angeboten.
- Feste Testdaten: E-Mail `demo@kunde.de`, Passwort `demo1234`.
- Nach Login wird der Benutzer begrüßt; es findet keine echte Authentifizierung statt.

## Warenkorb
- Produktdaten werden in `localStorage` im Browser gespeichert.
- Struktur: `{ id, name, price, quantity, image, slug }[]`
- Ein kleines Warenkorb-Icon in der Navigation zeigt die aktuelle Anzahl.
- Der Warenkorb ist auf `/shop/warenkorb` und `/shop/checkout` sichtbar.

## Checkout-Flow
1. Benutzer geht zum Warenkorb.
2. Klickt „Zur Kasse“.
3. Optional: Test-Account anmelden.
4. Zeigt Lieferadresse, Zahlungsmethode (nur Vorauswahl) und Gesamtsumme.
5. Klick auf „Jetzt bestellen“ simuliert eine Bestellung und leitet auf `/shop/danke` weiter.

## Stripe-Integration (zukünftig)
- Der Checkout-Button erhält einen `data-stripe`-Marker.
- Eine zentrale `checkout.ts`-Hilfsfunktion kapselt den späteren Stripe-Aufruf.
- Aktuell wird nur `console.log` mit den Bestelldaten ausgegeben und zur Danke-Seite navigiert.

## Komponenten

### Neu
- `ShopPasswordGate.astro` – Passwortabfrage für Shop-Seiten
- `ShopNavigation.astro` – Navigation innerhalb des Shops mit Warenkorb-Icon
- `ProductCard.astro` – Produkt-Teaser
- `ProductGallery.astro` – Bildergalerie auf der Detailseite
- `AddToCart.astro` – Interaktiver „In den Warenkorb“-Button
- `CartItem.astro` – Einzelposition im Warenkorb
- `CartSummary.astro` – Preiszusammenfassung
- `CheckoutForm.astro` – Adress- & Zahlungsformular
- `TestAccountLogin.astro` – Demo-Login-Formular
- `OrderSuccess.astro` – Erfolgsmeldung

### Layouts
- `ShopLayout.astro` – Erweitert `Layout.astro`, bindet `ShopPasswordGate` und `ShopNavigation` ein

## Design-Richtung
- **Stil**: Editorial / Luxus-Minimalismus (vergleichbar mit High-End-Design-Shops wie Aesop oder COS)
- **Farben**: Warmes Off-White (`#FAF8F5`), tiefes Espresso-Schwarz (`#1A1816`), Akzent Terrakotta/Burnt Sienna (`#C45D3A`)
- **Typografie**: Elegante Serif-Display-Schrift (Playfair Display) für Headlines, klare Sans-Serif (Work Sans) für UI-Text
- **Mikro-Interaktionen**: Sanfte Fade-ins, Hover-Lifts, dezente Grain-Textur im Hintergrund
- **Whitespace**: Großzügige Abstände, asymmetrische Kompositionen

## Daten
- Produktdaten werden in `src/data/products.ts` als TypeScript-Array gepflegt.
- Shop-spezifische Einstellungen (Passwort, Test-Account) landen in `src/data/shopConfig.ts`.

## Tests / Qualität
- `npm run build` muss fehlerfrei durchlaufen.
- Lighthouse-Checks für Accessibility & Best Practices sollen grün sein.
- Keine Konsolenfehler auf den Shop-Seiten.

## Nächster Schritt
Implementierungsplan mit `writing-plans` erstellen und anschließend umsetzen.
