"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModels = void 0;
const objection_1 = require("objection");
const orders_model_1 = require("./orders.model");
class CarsModels extends objection_1.Model {
    static get tableName() {
        return "cars";
    }
    static get relationMappings() {
        return {
            orders: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: orders_model_1.OrdersModel,
                join: {
                    from: 'cars.id',
                    to: 'orders.car_id'
                }
            }
        };
    }
}
exports.CarsModels = CarsModels;
