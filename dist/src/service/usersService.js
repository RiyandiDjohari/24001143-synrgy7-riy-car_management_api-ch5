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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUserById = exports.getUsersById = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.UsersModels.query().withGraphFetched("orders");
    if (users) {
        res.status(200).json({ message: "Success", users });
    }
    else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield users_model_1.UsersModels.query().findById(id).withGraphFetched("orders").throwIfNotFound();
    if (user) {
        res.status(200).json({ message: "Get user by id success", user });
    }
    else {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});
exports.getUsersById = getUsersById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const deletedUser = yield users_model_1.UsersModels.query().deleteById(id);
    if (deletedUser) {
        res.status(200).json({ message: `Delete User with id ${id} Success` });
    }
    else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});
exports.deleteUserById = deleteUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const updatedUser = yield users_model_1.UsersModels.query().findById(id).update(payload);
    if (updatedUser) {
        res.status(200).json({ message: `User with id ${id} Updated` });
    }
    else {
        res.status(400).json({ message: `User with id ${id} not found` });
    }
});
exports.updateUser = updateUser;
