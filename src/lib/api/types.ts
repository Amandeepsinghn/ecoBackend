export type ProductPhoto = {
  id: number;
  url: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number | null;
  description: string | null;
  product_type: string | null;
  user_id: number | null;
  photos: ProductPhoto[];
};

export type UserCreate = {
  user_name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: number;
  user_name: string;
  email: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  role: string;
};

export type UserProfile = {
  id: number;
  user_name: string;
  email: string;
  credit: number | null;
  is_admin: boolean;
};

export type ProfileUpdate = {
  user_name?: string | null;
  email?: string | null;
  current_password?: string | null;
  new_password?: string | null;
};

export type OrderItemCreate = {
  product_id: number;
  quantity: number;
};

export type OrderCreate = {
  items: OrderItemCreate[];
};

export type OrderItem = {
  product_id: number;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: number;
  total_price: number;
  status: string;
  credit: number;
  items: OrderItem[];
};

/** Fields for multipart POST /admin/products (plus optional `files`). */
export type AdminProductCreate = {
  name: string;
  stock: number;
  price: number;
  description?: string | null;
  product_type?: string | null;
};

export type AdminProductUpdate = {
  name?: string | null;
  price?: number | null;
  stock?: number | null;
  description?: string | null;
};

export type AdminStockUpdate = {
  stock: number;
};

export type AdminRoleUpdate = {
  is_admin: boolean;
};

export type AdminUser = {
  id: number;
  user_name: string;
  email: string;
  is_admin: boolean;
};
