import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.ts";

const router = new Router();

// @ route GET /api/v1/products
router.get("/api/v1/products", getProducts);

// @ route GET /api/v1/products/:id
router.get("/api/v1/products/:id", getProduct);

// @ route POST /api/v1/products
router.post("/api/v1/products/", addProduct);

// @ route PUT /api/v1/products/:id
router.put("/api/v1/products/:id", updateProduct);

// @ route PUT /api/v1/products/:id
router.delete("/api/v1/products/:id", deleteProduct);

export default router;
