# Shop-Vorschau für iZ – Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine passwortgeschützte, ästhetisch überzeugende Shop-Vorschau mit Beispielprodukt, Warenkorb, Checkout und Test-Account im bestehenden Astro-Stack bauen.

**Architecture:** Clientseitige Shop-Funktionalität (Passwort-Gate, Warenkorb, Test-Login) auf Basis von Vanilla-JS und localStorage/sessionStorage; Astro rendert statische Seiten und Komponenten. Produktdaten und Shop-Konfiguration liegen in TypeScript-Dateien im `src/data/`-Ordner. Checkout ist zunächst simuliert, Stripe ist als klarer Platzhalter vorbereitet.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript, Google Fonts (Playfair Display, Work Sans), localStorage/sessionStorage.

**Spec:** `docs/superpowers/specs/2026-10-05-shop-vorschau-design.md`

## Global Constraints
- Astro-Komponenten verwenden `.astro`-Extension und TypeScript-Logik in `.ts`-Dateien.
- Tailwind CSS 4 für Styling; globale Design-Tokens über CSS-Variablen in `src/styles/global.css`.
- PascalCase für Komponenten, camelCase für Variablen/Funktionen.
- Bilder über die bestehende `DynamicImage`-Komponente einbinden.
- Shop-Seiten sollen von Suchmaschinen ausgeschlossen werden (`robots: noindex`).
- Keine echten Zahlungen; Stripe nur als klar markierter Platzhalter.

## Review Focus
- Passwort-Gate blockiert den Shop-Inhalt bis zur Eingabe des korrekten Passworts und merkt sich das für die Session.
- Warenkorb wird über Seitenwechsel hinweg in localStorage gehalten und korrekt aktualisiert.
- Mobile Navigation und Warenkorb-Icon sind bedienbar und responsiv.
- Checkout zeigt eine korrekte Preiszusammenfassung und simuliert die Bestellung fehlerfrei.
- `npm run build` läuft ohne Fehler durch.

---

### Task 1: Projekt-Setup und globale Konfiguration

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Modify: `src/content/settings/index.json`
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Produces: Projektname, Site-URL, globale CSS-Variablen, Schriftarten, Shop-Link in Navigation.

- [ ] **Step 1: Projektmetadaten anpassen**

Setze in `package.json` den Namen auf `iz-shop-vorschau` und in `astro.config.mjs` die `site` auf `https://iz-shop-vorschau.de`.

- [ ] **Step 2: Shop-Daten in Settings eintragen**

Fülle `src/content/settings/index.json` mit realistischen Platzhalter-Werten für eine Design-Agentur (z.B. `companyName: "iZ Design Studio"`, `email: "hello@iz-shop.de"`, `phone: "+49 123 456789"`, Adresse).

- [ ] **Step 3: Globales Design-System in global.css definieren**

Füge CSS-Variablen hinzu:
- `--color-bg: #FAF8F5`
- `--color-text: #1A1816`
- `--color-accent: #C45D3A`
- `--color-muted: #6B6560`
- `--font-display: 'Playfair Display', serif`
- `--font-body: 'Work Sans', sans-serif`

Binde Google Fonts über `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@300;400;500;600&display=swap');` ein.
Füge eine dezente Korn-Textur als Hintergrund-Overlay hinzu.

- [ ] **Step 4: Layout für Schriftarten und noindex vorbereiten**

Ergänze `Layout.astro` um den Google-Fonts-Import (falls nicht über CSS) und erlaube optional ein `robots`-Prop (`noindex`).

- [ ] **Step 5: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich, keine Fehler.

- [ ] **Step 6: Commit**

```bash
git add package.json astro.config.mjs src/content/settings/index.json src/styles/global.css src/layouts/Layout.astro
git commit -m "chore: project setup and design tokens for shop preview"
```

---

### Task 2: Shop-Daten und Typen anlegen

**Files:**
- Create: `src/data/shopTypes.ts`
- Create: `src/data/products.ts`
- Create: `src/data/shopConfig.ts`

**Interfaces:**
- Produces: `Product`-Typ, `CartItem`-Typ, Produktdaten, Shop-Konfiguration (Passwort, Test-Account).
- Consumes: Spätere Komponenten greifen auf `products` und `shopConfig` zu.

- [ ] **Step 1: Typen definieren**

In `src/data/shopTypes.ts`:
```ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  features: string[];
  specs: { label: string; value: string }[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
}
```

- [ ] **Step 2: Beispielprodukt anlegen**

In `src/data/products.ts` ein Premium-Produkt (z.B. "Atelier Leuchte No. 1") mit mindestens zwei Bildern, Preis 349 €, Beschreibung, Features und Specs.

- [ ] **Step 3: Shop-Konfiguration anlegen**

In `src/data/shopConfig.ts`:
```ts
export const shopConfig = {
  password: "iz-shop-2026",
  testAccount: {
    email: "demo@kunde.de",
    password: "demo1234",
  },
  currency: "€",
};
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add product data, types and shop config"
```

---

### Task 3: Passwort-Gate und Shop-Layout

**Files:**
- Create: `src/components/shop/ShopPasswordGate.astro`
- Create: `src/components/shop/ShopNavigation.astro`
- Create: `src/layouts/ShopLayout.astro`

**Interfaces:**
- Consumes: `shopConfig.password`
- Produces: `ShopLayout` mit integriertem Passwort-Gate und Shop-Navigation.

- [ ] **Step 1: Passwort-Gate implementieren**

`ShopPasswordGate.astro` zeigt initial ein Vollbild-Overlay mit Passwort-Eingabe. Bei korrekter Eingabe von `iz-shop-2026` wird ein `sessionStorage`-Flag `izShopAccess` gesetzt und das Overlay entfernt. Bei Fehler wird eine rote Meldung angezeigt.

- [ ] **Step 2: Shop-Navigation bauen**

`ShopNavigation.astro` enthält Links zu `/shop`, `/shop/warenkorb`, `/shop/checkout` und ein dynamisches Warenkorb-Icon mit Anzeige der Artikelanzahl (initial über `localStorage`, aktualisiert über Custom-Event `cart:updated`).

- [ ] **Step 3: Shop-Layout zusammenstellen**

`ShopLayout.astro` erweitert `Layout.astro`, setzt `robots="noindex"`, bindet `ShopPasswordGate` und `ShopNavigation` ein und rendert den `<slot />`.

- [ ] **Step 4: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich.

- [ ] **Step 5: Commit**

```bash
git add src/components/shop/ src/layouts/ShopLayout.astro
git commit -m "feat: add password gate, shop navigation and shop layout"
```

---

### Task 4: Warenkorb-Utility

**Files:**
- Create: `src/lib/cart.ts`

**Interfaces:**
- Consumes: `CartItem`-Typ
- Produces: `getCart()`, `addToCart(item)`, `updateQuantity(id, quantity)`, `removeFromCart(id)`, `clearCart()`, `getCartCount()`, `getCartTotal()`, `dispatchCartUpdate()`.

- [ ] **Step 1: Cart-Utility implementieren**

In `src/lib/cart.ts`:
- Speichere Cart als JSON in `localStorage` unter `iz-shop-cart`.
- `addToCart` erhöht bei bestehendem Artikel die Menge.
- `updateQuantity` löscht Artikel bei Menge ≤ 0.
- `dispatchCartUpdate` feuert ein `cart:updated`-Event, damit die Navigation neu rendert.

- [ ] **Step 2: Commit**

```bash
git add src/lib/cart.ts
git commit -m "feat: add cart utility with localStorage and events"
```

---

### Task 5: Produkt-Komponenten

**Files:**
- Create: `src/components/shop/ProductCard.astro`
- Create: `src/components/shop/ProductGallery.astro`
- Create: `src/components/shop/AddToCart.astro`

**Interfaces:**
- Consumes: `Product`-Typ, `addToCart()`
- Produces: Wiederverwendbare Produkt-Komponenten.

- [ ] **Step 1: ProductCard bauen**

Zeigt Produktbild, Name, Tagline, Preis und einen "Mehr erfahren"-Link. Verwendet `DynamicImage`.

- [ ] **Step 2: ProductGallery bauen**

Zeigt ein Hauptbild und eine Thumbnail-Leiste. Klick auf Thumbnail wechselt das Hauptbild.

- [ ] **Step 3: AddToCart-Button bauen**

Button mit Mengen-Selektor (+/-). Bei Klick wird das Produkt über `addToCart()` in den Warenkorb gelegt und eine Bestätigungsanimation ausgelöst.

- [ ] **Step 4: Commit**

```bash
git add src/components/shop/ProductCard.astro src/components/shop/ProductGallery.astro src/components/shop/AddToCart.astro
git commit -m "feat: add product card, gallery and add-to-cart components"
```

---

### Task 6: Shop-Seiten

**Files:**
- Create: `src/pages/shop/index.astro`
- Create: `src/pages/shop/produkt/[slug].astro`
- Modify: `src/components/Navigation.astro`

**Interfaces:**
- Consumes: `ShopLayout`, `ProductCard`, `ProductGallery`, `AddToCart`, `products`-Array
- Produces: `/shop`, `/shop/produkt/:slug`

- [ ] **Step 1: Shop-Startseite erstellen**

`src/pages/shop/index.astro` verwendet `ShopLayout`. Hero-Bereich mit Display-Font, Vorteils-Sektion, `ProductCard` für das Beispielprodukt.

- [ ] **Step 2: Produktdetailseite erstellen**

`src/pages/shop/produkt/[slug].astro` rendert per `getStaticPaths()` das Produkt. Enthält `ProductGallery`, Beschreibung, Features, Specs-Tabelle und `AddToCart`.

- [ ] **Step 3: Hauptnavigation um Shop-Link erweitern**

Füge in `src/components/Navigation.astro` einen Link `/shop` mit einem kleinen „Vorschau“-Badge hinzu.

- [ ] **Step 4: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich, Detailseiten werden generiert.

- [ ] **Step 5: Commit**

```bash
git add src/pages/shop/ src/components/Navigation.astro
git commit -m "feat: add shop landing and product detail pages"
```

---

### Task 7: Warenkorb-Seite

**Files:**
- Create: `src/components/shop/CartItem.astro`
- Create: `src/components/shop/CartSummary.astro`
- Create: `src/pages/shop/warenkorb.astro`

**Interfaces:**
- Consumes: `getCart()`, `updateQuantity()`, `removeFromCart()`, `CartItem`-Typ
- Produces: `/shop/warenkorb`

- [ ] **Step 1: CartItem-Komponente bauen**

Zeigt Bild, Name, Einzelpreis, Mengen-Steuerung (+/-) und Löschen-Button. Aktualisiert den Warenkorb bei Änderungen.

- [ ] **Step 2: CartSummary bauen**

Zeigt Zwischensumme, Versandkosten (Pauschal 5,90 €), Gesamtsumme und den Button „Zur Kasse“.

- [ ] **Step 3: Warenkorb-Seite erstellen**

`src/pages/shop/warenkorb.astro` zeigt bei leerem Warenkorb einen entsprechenden Hinweis, sonst die Liste der `CartItem`-Komponenten und `CartSummary`.

- [ ] **Step 4: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich.

- [ ] **Step 5: Commit**

```bash
git add src/components/shop/CartItem.astro src/components/shop/CartSummary.astro src/pages/shop/warenkorb.astro
git commit -m "feat: add cart page with item list and summary"
```

---

### Task 8: Checkout, Test-Account und Danke-Seite

**Files:**
- Create: `src/components/shop/TestAccountLogin.astro`
- Create: `src/components/shop/CheckoutForm.astro`
- Create: `src/lib/checkout.ts`
- Create: `src/pages/shop/checkout.astro`
- Create: `src/pages/shop/danke.astro`

**Interfaces:**
- Consumes: `getCart()`, `clearCart()`, `shopConfig.testAccount`, `CartSummary`
- Produces: `/shop/checkout`, `/shop/danke`, simulierter Checkout-Handler.

- [ ] **Step 1: Test-Account-Login bauen**

`TestAccountLogin.astro` bietet E-Mail/Passwort-Eingabe. Bei korrekten Daten (`demo@kunde.de` / `demo1234`) wird ein Hinweis „Angemeldet als Demo-Kunde“ angezeigt.

- [ ] **Step 2: Checkout-Formular bauen**

`CheckoutForm.astro` enthält Felder für E-Mail, Name, Straße, PLZ, Stadt und Zahlungsmethode (Vorauswahl: Kreditkarte, PayPal, Klarna). Validiert Pflichtfelder clientseitig.

- [ ] **Step 3: Checkout-Utility anlegen**

`src/lib/checkout.ts` exportiert `processOrder(cart, formData)`. Aktuell wird nur `console.log` ausgegeben und eine Weiterleitung auf `/shop/danke` vorbereitet. Ein Kommentar markiert den späteren Stripe-Hook.

- [ ] **Step 4: Checkout-Seite erstellen**

`src/pages/shop/checkout.astro` zeigt `TestAccountLogin`, `CartSummary` (nur Lesemodus) und `CheckoutForm`. Beim Absenden wird `processOrder()` aufgerufen, der Warenkorb geleert und zur Danke-Seite weitergeleitet.

- [ ] **Step 5: Danke-Seite erstellen**

`src/pages/shop/danke.astro` zeigt eine ansprechende Erfolgsmeldung und einen Link zurück zum Shop.

- [ ] **Step 6: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich.

- [ ] **Step 7: Commit**

```bash
git add src/components/shop/TestAccountLogin.astro src/components/shop/CheckoutForm.astro src/lib/checkout.ts src/pages/shop/checkout.astro src/pages/shop/danke.astro
git commit -m "feat: add checkout flow, test account and thank you page"
```

---

### Task 9: Polishing, Responsive-Check und finale Tests

**Files:**
- Modify: alle betroffenen Shop-Dateien nach Bedarf

**Interfaces:**
- Produces: Fehlerfreier, responsiver, barrierefreier Shop.

- [ ] **Step 1: Barrierefreiheit prüfen**

- Alle interaktiven Elemente müssen Tastatur-erreichbar sein.
- Bilder haben `alt`-Texte.
- Formularfelder haben Labels.
- Farbkontraste sind ausreichend.

- [ ] **Step 2: Responsive-Check**

Teste Viewports 320px, 768px, 1024px, 1440px. Shop-Navigation, Galerie, Warenkorb und Checkout müssen auf allen Breiten gut aussehen.

- [ ] **Step 3: Build-Check**

Run: `npm run build`
Expected: Build erfolgreich, keine Warnungen.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: accessibility, responsiveness and final build checks"
```

---

### Task 10: Git-Integration auf main

**Files:**
- Branch: `master` → `main`

**Interfaces:**
- Produces: Alle Änderungen auf `main` committet.

- [ ] **Step 1: main-Branch anlegen und auschecken**

```bash
git checkout -b main
```

- [ ] **Step 2: Finale Prüfung**

Run: `git log --oneline -10`
Expected: Zeigt alle Commits der Shop-Vorschau.

- [ ] **Step 3: Branch-Status prüfen**

Run: `git branch -a`
Expected: `main` ist ausgecheckt.

> Hinweis: Ein Push wird nicht durchgeführt, da keine Remote-URL konfiguriert ist. Der User kann später `git push -u origin main` ausführen.
