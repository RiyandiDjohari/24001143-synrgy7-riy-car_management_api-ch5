"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.login = exports.loginWithGoogle = void 0;
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("../models/users.model");
const uuid_1 = require("uuid");
const client = new google_auth_library_1.OAuth2Client();
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(hash);
        });
    });
};
const checkPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hash, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
const loginWithGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: "785137152023-776su8qaht1sl54f3aqhlatmad2a0ogj.apps.googleusercontent.com",
        });
        const response = ticket.getPayload();
        const payload = {
            id: response === null || response === void 0 ? void 0 : response.sub,
            role: "user",
        };
        const tokenJwt = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ status: true, message: "Success", token: tokenJwt, data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.loginWithGoogle = loginWithGoogle;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_model_1.UsersModels.query().findOne({ email });
        if (!user) {
            res.status(404).json({
                status: false,
                message: "Not Found - User not registered",
            });
            return;
        }
        if (!email || !password) {
            res.status(400).json({
                status: false,
                message: "Email or password wrong",
            });
            return;
        }
        const isPasswordMatch = yield checkPassword(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                status: false,
                message: "Username or password wrong",
            });
            return;
        }
        else {
            const payload = {
                id: user.id,
                name: user.name,
                role: user.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).json({
                status: true,
                message: "Login Successfully",
                token,
                data: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.login = login;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const hashedPassword = yield encryptPassword(payload.password);
        const existingUser = yield users_model_1.UsersModels.query().findOne({ username: payload.username });
        const existingEmail = yield users_model_1.UsersModels.query().findOne({ email: payload.email });
        if (payload.password.length < 6) {
            res.status(400).json({
                status: false,
                message: "Password must be at least 6 characters",
            });
            return;
        }
        if (existingUser) {
            res.status(400).json({
                status: false,
                message: "Username already registered",
            });
            return;
        }
        if (existingEmail) {
            res.status(400).json({
                status: false,
                message: "Email already registered",
            });
            return;
        }
        if (payload) {
            const user = yield users_model_1.UsersModels.query().insert(Object.assign(Object.assign({}, payload), { id: (0, uuid_1.v4)(), password: hashedPassword, role: "user" }));
            res.status(201).json({ status: true, message: "Register user successfully", data: user });
        }
        else {
            res.status(400).json({ status: false, message: "Failed to register user" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
