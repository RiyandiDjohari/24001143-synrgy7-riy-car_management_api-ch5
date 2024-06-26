"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carsRouter_1 = __importDefault(require("./carsRouter"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const router = (0, express_1.Router)();
router.use("/cars", carsRouter_1.default);
router.use("/users", usersRouter_1.default);
router.use("/orders", ordersRouter_1.default);
router.use("/auth", authRouter_1.default);
exports.default = router;
