import type { CartItem } from "../data/shopTypes";

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(price);
}

export function renderCartItem(item: CartItem): string {
  return `
    <li class="cart-item flex gap-5 py-6" data-id="${item.id}">
      <a href="/shop/produkt/${item.slug}" class="h-24 w-24 flex-shrink-0 overflow-hidden bg-[var(--color-bg)]">
        <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover" loading="lazy" />
      </a>
      <div class="flex flex-1 flex-col justify-between">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <a href="/shop/produkt/${item.slug}" class="font-display text-lg font-medium text-[var(--color-text)] transition hover:text-[var(--color-accent)]">
              ${item.name}
            </a>
            <p class="text-sm text-[var(--color-text-muted)]">${formatPrice(item.price, item.currency)}</p>
          </div>
          <button type="button" class="remove-item text-sm text-[var(--color-text-muted)] underline decoration-[var(--color-border)] underline-offset-4 transition hover:text-red-600" aria-label="${item.name} entfernen">
            Entfernen
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center border border-[var(--color-border)] bg-[var(--color-surface)]">
            <button type="button" class="quantity-decrease px-3 py-2 text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]" aria-label="Menge verringern">−</button>
            <span class="quantity-display min-w-[2rem] select-none text-center text-sm font-medium text-[var(--color-text)]" aria-live="polite">${item.quantity}</span>
            <button type="button" class="quantity-increase px-3 py-2 text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]" aria-label="Menge erhöhen">+</button>
          </div>
          <p class="item-total text-base font-medium text-[var(--color-text)]">${formatPrice(item.price * item.quantity, item.currency)}</p>
        </div>
      </div>
    </li>
  `;
}
