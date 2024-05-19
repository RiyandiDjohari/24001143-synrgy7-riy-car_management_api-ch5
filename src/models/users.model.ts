import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders.model";

export class UsersModels extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: OrdersModel,
            join: {
                from : 'users.id',
                to : 'orders.user_id'
            }
        }
    }
  }
}

export type Users = ModelObject<UsersModels>;
