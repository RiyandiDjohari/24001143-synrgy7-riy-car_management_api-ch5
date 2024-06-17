import { Router } from "express";
import { createCar, getCars, getCarsById, deleteCarById, updateCar } from "../service/carsService";
import cdnUpload from "../middleware/cdnUploadHandler";
import { checkAuth, isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, getCars);
router.get("/:id", checkAuth, isAdmin, getCarsById);
router.post("/", cdnUpload.single('image'), checkAuth, isAdmin, createCar);
router.delete("/:id", checkAuth, isAdmin, deleteCarById);
router.put("/:id", cdnUpload.single('image'), checkAuth, isAdmin, updateCar);

export default router;
