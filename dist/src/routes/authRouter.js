"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../service/authService");
const router = (0, express_1.Router)();
router.post("/login", authService_1.login);
router.post("/login/google", authService_1.loginWithGoogle);
router.post("/register", authService_1.registerUser);
exports.default = router;
