"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carsService_1 = require("../service/carsService");
const cdnUploadHandler_1 = __importDefault(require("../middleware/cdnUploadHandler"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.checkAuth, carsService_1.getCars);
router.get("/:id", auth_1.checkAuth, auth_1.isAdmin, carsService_1.getCarsById);
router.post("/", cdnUploadHandler_1.default.single('image'), auth_1.checkAuth, auth_1.isAdmin, carsService_1.createCar);
router.delete("/:id", auth_1.checkAuth, auth_1.isAdmin, carsService_1.deleteCarById);
router.put("/:id", cdnUploadHandler_1.default.single('image'), auth_1.checkAuth, auth_1.isAdmin, carsService_1.updateCar);
exports.default = router;
