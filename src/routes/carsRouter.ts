import { Router } from "express";
import { createCar, getCars, getCarsById, deleteCarById, updateCar, uploadImageHandler } from "../service/carsService";
import cdnUpload from "../middleware/cdnUploadHandler";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCarsById);
router.post("/", createCar);
router.delete("/:id", deleteCarById);
router.post('/image', cdnUpload.single('image'), uploadImageHandler)
router.put("/:id", updateCar);

export default router;
