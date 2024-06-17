import { Model, ModelObject } from "objection";
import { UsersModels } from "./users.model";
import { CarsModels } from "./cars.model";

export class OrdersModel extends Model {
    id!: string;
    start_rent!: Date;
    finish_rent!: Date;
    status!: string;
    user_id!: string;
    car_id!: string;
    created_at!: Date;
    updated_at!: Date;

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