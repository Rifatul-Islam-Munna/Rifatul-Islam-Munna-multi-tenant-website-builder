export type LoginResponse = {
  token: string;
  message: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  phone: string;
  shopName: string;
  shopSlug: string;
  userSlug: string;
  isVerified: boolean;
  isDeactivated: boolean;
};

export type UserRole = "Admin" | "ShopAdmin" | "Editor" | "Developer";
