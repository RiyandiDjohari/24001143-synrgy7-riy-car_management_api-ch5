import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.uuid("id").primary();
        table.string("plate", 30).notNullable();
        table.string("manufacture", 30).notNullable();
        table.string("model", 30).notNullable();
        table.string("image").notNullable();
        table.integer("rentPerDay", 30).notNullable();
        table.integer("capacity", 2).notNullable();
        table.string("description")
        table.timestamp("availableAt").notNullable();
        table.string("transmission", 20).notNullable();
        table.boolean("available").notNullable();
        table.string("type", 20).notNullable();
        table.integer("year", 4).notNullable();
        table.specificType("options", 'TEXT[]').notNullable();
        table.specificType("specs", 'TEXT[]').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

