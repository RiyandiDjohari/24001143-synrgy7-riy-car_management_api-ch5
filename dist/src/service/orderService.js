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
exports.updateOrder = exports.deleteOrderById = exports.createOrder = exports.getOrdersById = exports.getOrders = void 0;
const orders_model_1 = require("../models/orders.model");
const uuid_1 = require("uuid");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_model_1.OrdersModel.query().withGraphFetched("user").withGraphFetched("car");
        if (orders) {
            res.status(200).json({ status: true, message: "Success", orders });
        }
        else {
            res.status(400).json({ status: false, message: "Something Went Wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getOrders = getOrders;
const getOrdersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield orders_model_1.OrdersModel.query()
            .findById(id)
            .withGraphFetched("user")
            .withGraphFetched("car")
            .throwIfNotFound();
        if (order) {
            res.status(200).json({ status: true, message: "Get order by id success", order });
        }
        else {
            res.status(400).json({ status: false, message: "Something Went Wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getOrdersById = getOrdersById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const ordersLength = (yield orders_model_1.OrdersModel.query()).length;
        if (payload) {
            const order = yield orders_model_1.OrdersModel.query().insert(Object.assign({ id: (0, uuid_1.v4)() }, payload));
            res.status(201).json({ status: true, message: "Create new order successfully", order });
        }
        else {
            res.status(400).json({ status: false, message: "Something Went Wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.createOrder = createOrder;
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const deletedOrder = yield orders_model_1.OrdersModel.query().deleteById(id);
        if (deletedOrder) {
            res.status(200).json({ status: true, message: `Delete Order with id ${id} Success` });
        }
        else {
            res.status(404).json({ status: false, message: `Order with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.deleteOrderById = deleteOrderById;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        const updatedOrder = yield orders_model_1.OrdersModel.query().findById(id).update(payload);
        if (updatedOrder) {
            res.status(200).json({ status: true, message: `Order with id ${id} Updated` });
        }
        else {
            res.status(400).json({ status: false, message: `Order with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.updateOrder = updateOrder;
