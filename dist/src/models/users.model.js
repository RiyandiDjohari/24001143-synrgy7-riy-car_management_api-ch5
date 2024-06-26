"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModels = void 0;
const objection_1 = require("objection");
const orders_model_1 = require("./orders.model");
class UsersModels extends objection_1.Model {
    static get tableName() {
        return "users";
    }
    static get relationMappings() {
        return {
            orders: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: orders_model_1.OrdersModel,
                join: {
                    from: 'users.id',
                    to: 'orders.user_id'
                }
            }
        };
    }
}
exports.UsersModels = UsersModels;
