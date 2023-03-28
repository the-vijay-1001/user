import express from "express";
import { addToCart,viewCart,loadCart,remove,viewItems} from "../controller/cart.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/add-to-cart/:userId/:productId",verify,addToCart);
router.get("/view-cart",verify,viewCart);
router.get("/remove/:id",verify,remove);
router.get("/load-cart",loadCart);
router.get("/view-items/:itemid/:personName",verify,viewItems);
export default router;