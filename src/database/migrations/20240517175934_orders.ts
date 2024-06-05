import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table : Knex.TableBuilder) => {
        table.increments("id").primary();
        table.date("start_rent").notNullable();
        table.date("finish_rent").notNullable();
        table.string("status", 255).notNullable();
        table.integer("user_id").notNullable();
        table.string("car_id").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders");
}

