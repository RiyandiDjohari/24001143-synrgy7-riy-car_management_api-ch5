import { Router } from "express";
import { createOrder, getOrders, getOrdersById, deleteOrderById, updateOrder } from "../service/orderService";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrdersById);
router.post("/", createOrder);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateOrder);

export default router;
