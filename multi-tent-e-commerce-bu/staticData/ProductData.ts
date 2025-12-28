// staticData/ProductData.ts
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  currency: string;
  badge?: string;       // e.g. "New", "-40%"
  discountLabel?: string; // e.g. "Save 25%"
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Sremium Panjabi they way of panjabi thinks it is, thw fawf af",
    image: "/test.png",
    price: 3050,
    oldPrice: 4000,
    currency: "৳",
    badge: "Best Seller",
    discountLabel: "Save 19%",
  },
  {
    id: 2,
    name: "Classic White Panjabi",
    image: "/test.png",
    price: 2250,
    oldPrice: 3200,
    currency: "৳",
    badge: "New",
    discountLabel: "Save 29%",
  },
  {
    id: 3,
    name: "Soft Pink Panjabi",
    image: "/test.png",
    price: 2150,
    oldPrice: 2800,
    currency: "৳",
  },
  {
    id: 4,
    name: "Chocolate Brown Panjabi",
    image: "/test.png",
    price: 1450,
    oldPrice: 1700,
    currency: "৳",
    badge: "-15%",
  },
];
