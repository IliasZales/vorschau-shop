import type { CartItem } from "../data/shopTypes";

const CART_KEY = "iz-shop-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchCartUpdate();
}

export function dispatchCartUpdate(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }): void {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += item.quantity ?? 1;
  } else {
    cart.push({ ...item, quantity: item.quantity ?? 1 });
  }

  saveCart(cart);
}

export function updateQuantity(id: string, quantity: number): void {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const item = cart.find((entry) => entry.id === id);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
}

export function removeFromCart(id: string): void {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  dispatchCartUpdate();
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}
