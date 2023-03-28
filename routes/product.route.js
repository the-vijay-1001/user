import express from "express";
import {search,allProduct,productByCategory} from "../controller/product.controller.js";
const router = express.Router();

router.get("/search/:keyword",search);
router.get("/all",allProduct);
router.get("/:categoryName",productByCategory);
export default router;