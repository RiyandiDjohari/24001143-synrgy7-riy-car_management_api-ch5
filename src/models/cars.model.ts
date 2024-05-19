import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders.model";

export class CarsModels extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: string;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  options!: string[];
  specs!: string[];

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: OrdersModel,
            join: {
                from : 'cars.id',
                to : 'orders.car_id'
            }
        }
    }
  }
}

export type Cars = ModelObject<CarsModels>;
