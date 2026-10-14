export const paths = {
  auth: {
    me: "/auth/me",
    register: "/auth/register",
    login: "/auth/login",
  },
  users: {
    profile: "/users/profile",
    products: "/users/products",
    product: (productId: number) => `/users/products/${productId}`,
  },
  orders: {
    // Proxied to FastAPI /orders/ by next.config.ts rewrites.
    checkout: "/orders",
  },
  admin: {
    userRole: (userId: number) => `/admin/users/${userId}/role`,
    products: "/admin/products",
    product: (productId: number) => `/admin/products/${productId}`,
    stock: (productId: number) => `/admin/products/${productId}/stock`,
    photos: (productId: number) => `/admin/products/${productId}/photos`,
    photo: (productId: number, photoId: number) =>
      `/admin/products/${productId}/photos/${photoId}`,
  },
} as const;
