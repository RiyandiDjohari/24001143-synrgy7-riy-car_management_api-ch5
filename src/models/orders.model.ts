import { Model, ModelObject } from "objection";
import { UsersModels } from "./users.model";
import { CarsModels } from "./cars.model";

export class OrdersModel extends Model {
    id!: number;
    start_rent!: Date;
    finish_rent!: Date;
    status!: string;
    user_id!: number;
    car_id!: string;

    static get tableName() {
        return 'orders'
    }

    static get relationMappings() {
        return {
            user : {
                relation: Model.BelongsToOneRelation,
                modelClass: UsersModels,
                join: {
                    from: 'orders.user_id', 
                    to: 'users.id',
                }
            },
            car : {
                relation: Model.BelongsToOneRelation,
                modelClass: CarsModels,
                join: {
                    from: 'orders.car_id', 
                    to: 'cars.id',
                }
            },

        }
    }
}

export type Orders = ModelObject<OrdersModel>