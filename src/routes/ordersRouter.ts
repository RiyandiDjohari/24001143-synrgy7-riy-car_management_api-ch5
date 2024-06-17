import { Router } from "express";
import { createOrder, getOrders, getOrdersById, deleteOrderById, updateOrder } from "../service/orderService";
import { checkAuth, isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, getOrders);
router.get("/:id", checkAuth, getOrdersById);
router.post("/", checkAuth, createOrder);
router.delete("/:id", checkAuth, deleteOrderById);
router.put("/:id", checkAuth, updateOrder);

export default router;
