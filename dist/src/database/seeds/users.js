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
exports.seed = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("users").del();
        // Inserts seed entries
        yield knex("users").insert([
            { id: (0, uuid_1.v4)(), name: "admin", username: "admin", email: "admin@mail.com", password: bcrypt_1.default.hashSync('admin', 10), role: "admin" },
            { id: (0, uuid_1.v4)(), name: "john doe", username: "john doe", email: "johndoe@mail.com", password: bcrypt_1.default.hashSync('12345', 10), role: "user" },
            { id: (0, uuid_1.v4)(), name: "jane doe", username: "jane doe", email: "janedoe@mail.com", password: bcrypt_1.default.hashSync('12345', 10), role: "user" },
            { id: (0, uuid_1.v4)(), name: "june doe", username: "june doe", email: "junedoe@mail.com", password: bcrypt_1.default.hashSync('12345', 10), role: "user" },
            { id: (0, uuid_1.v4)(), name: "jesy doe", username: "jesy doe", email: "jesydoe@mail.com", password: bcrypt_1.default.hashSync('12345', 10), role: "user" },
            { id: (0, uuid_1.v4)(), name: "josh doe", username: "josh doe", email: "joshdoe@mail.com", password: bcrypt_1.default.hashSync('12345', 10), role: "user" },
        ]);
    });
}
exports.seed = seed;
;
