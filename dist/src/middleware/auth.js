"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: false, message: "Unauthorized - Invalid Token" });
            return;
        }
        const token = jsonwebtoken_1.default.verify(authorization.split(" ")[1], process.env.JWT_SECRET);
        req.user = token;
        next();
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error from check auth" });
    }
};
exports.checkAuth = checkAuth;
const isAdmin = (req, res, next) => {
    const user = req.user;
    console.log(user);
    if (user && user.role === "admin") {
        next();
    }
    else {
        res.status(403).json({
            status: false,
            message: "Forbidden - Access denied, admin only.",
        });
    }
};
exports.isAdmin = isAdmin;
