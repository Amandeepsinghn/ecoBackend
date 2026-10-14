export { errorMessage, ApiError, api } from "./client";
export { paths } from "./paths";
export { register, login, getMe } from "./auth";
export { getProfile, updateProfile, getProducts, getProduct } from "./users";
export { checkout } from "./orders";
export {
  updateUserRole,
  getAdminProducts,
  createProduct,
  getAdminProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  uploadProductPhotos,
  deleteProductPhoto,
} from "./admin";
