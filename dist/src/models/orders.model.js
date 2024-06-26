"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const objection_1 = require("objection");
const users_model_1 = require("./users.model");
const cars_model_1 = require("./cars.model");
class OrdersModel extends objection_1.Model {
    static get tableName() {
        return 'orders';
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: users_model_1.UsersModels,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id',
                }
            },
            car: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: cars_model_1.CarsModels,
                join: {
                    from: 'orders.car_id',
                    to: 'cars.id',
                }
            },
        };
    }
}
exports.OrdersModel = OrdersModel;
