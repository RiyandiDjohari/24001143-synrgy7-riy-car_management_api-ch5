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
exports.updateCar = exports.deleteCarById = exports.createCar = exports.getCarsById = exports.getCars = void 0;
const cars_model_1 = require("../models/cars.model");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield cars_model_1.CarsModels.query().withGraphFetched("orders");
        if (cars) {
            res.status(200).json({ status: true, message: "Success", cars });
        }
        else {
            res.status(400).json({ status: false, message: "Something Went Wrong" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getCars = getCars;
const getCarsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const car = yield cars_model_1.CarsModels.query().findById(id).withGraphFetched("orders").throwIfNotFound();
        if (car) {
            res.status(200).json({ status: true, message: `Get car with id ${id} success`, car });
        }
        else {
            res.status(400).json({ status: false, message: `Car with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getCarsById = getCarsById;
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id, plate, manufacture, model, image, capacity, description, transmission, type, year, option, specs }: Car = req.body;
        if (req.file) {
            const image = yield (0, utils_1.uploadImageHandler)(req.file, "cars");
            const car = yield cars_model_1.CarsModels.query().insert(Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)(), image: image.secure_url }));
            if (!car) {
                res.status(400).json({ status: false, message: "Something Went Wrong" });
            }
            res.status(201).json({ status: true, message: "Create new car successfully", data: car });
        }
        else {
            const car = yield cars_model_1.CarsModels.query().insert(Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() }));
            if (!car) {
                res.status(400).json({ status: false, message: "Something Went Wrong" });
            }
            res.status(201).json({ status: true, message: "Create new car successfully", data: car });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.createCar = createCar;
const deleteCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const deletedCar = yield cars_model_1.CarsModels.query().deleteById(id);
        if (deletedCar) {
            res.status(200).json({ status: true, message: `Delete car with id ${id} Success` });
        }
        else {
            res.status(404).json({ status: false, message: `Car with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.deleteCarById = deleteCarById;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        if (req.file) {
            const image = yield (0, utils_1.uploadImageHandler)(req.file, "cars");
            const updatedCars = yield cars_model_1.CarsModels.query()
                .findById(id)
                .update(Object.assign(Object.assign({}, payload), { id, image: image.secure_url }));
            if (updatedCars) {
                res.status(200).json({ status: true, message: `Cars with id ${id} Updated` });
            }
            else {
                res.status(404).json({ status: false, message: `Cars with id ${id} not found` });
            }
        }
        else {
            const updatedCars = yield cars_model_1.CarsModels.query()
                .findById(id)
                .update(Object.assign({ id }, payload));
            if (updatedCars) {
                res.status(200).json({ status: true, message: `Cars with id ${id} Updated` });
            }
            else {
                res.status(404).json({ status: false, message: `Cars with id ${id} not found` });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.updateCar = updateCar;
