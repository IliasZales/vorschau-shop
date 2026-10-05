import { getCart, clearCart } from "./cart";

export interface OrderData {
  items: ReturnType<typeof getCart>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    zip: string;
    city: string;
  };
  payment: string;
  total: number;
}

export function processOrder(formData: FormData): void {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order: OrderData = {
    items: cart,
    customer: {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      street: String(formData.get("street") || ""),
      zip: String(formData.get("zip") || ""),
      city: String(formData.get("city") || ""),
    },
    payment: String(formData.get("payment") || "card"),
    total,
  };

  // Stripe integration placeholder
  // TODO: Replace with Stripe checkout session creation
  console.log("[Shop Preview] Simulated order:", order);

  clearCart();
  window.location.href = "/shop/danke";
}
