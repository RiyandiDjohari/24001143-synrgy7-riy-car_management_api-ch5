import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders.model";

export class UsersModels extends Model {
  id!: string;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  created_at!: Date;
  updated_at!: Date;

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
