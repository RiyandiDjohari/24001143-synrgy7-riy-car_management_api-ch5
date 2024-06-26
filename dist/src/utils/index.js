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
exports.uploadImageHandler = void 0;
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
const uploadImageHandler = (image, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const fileBase64 = image.buffer.toString("base64");
    const file = `data:${image === null || image === void 0 ? void 0 : image.mimetype};base64,${fileBase64}`;
    try {
        return yield cloudinary_1.default.uploader.upload(file, {
            folder,
        });
    }
    catch (err) {
        throw new Error("Something went wrong");
    }
});
exports.uploadImageHandler = uploadImageHandler;
