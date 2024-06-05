import { Router } from "express";
import { createCar, getCars, getCarsById, deleteCarById, updateCar } from "../service/carsService";
import cdnUpload from "../middleware/cdnUploadHandler";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCarsById);
router.post("/", cdnUpload.single('image'), createCar);
router.delete("/:id", deleteCarById);
router.put("/:id", cdnUpload.single('image'), updateCar);

export default router;
