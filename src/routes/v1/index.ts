import { Router } from "express";
// import categoryRoutes from "./categories.routes";
import authRoutes from '../v1/auth.route'
import chatRoutes from '../v1/chat.route'
import categoryRoutes from '../v1/productCategory.route'
import variations from "../v1/variation.route";
import product from "./product.route";
import upl from "./upl.route";
const router = Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/category", categoryRoutes);
router.use("/variation", variations);
router.use("/product", product);
router.use("/upl", upl);

export default router;