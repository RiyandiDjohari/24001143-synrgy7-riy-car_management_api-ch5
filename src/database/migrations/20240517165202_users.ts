import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table : Knex.TableBuilder) => {
        table.uuid("id").primary();
        table.string("name", 255).notNullable();
        table.string("username", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("password", 255).notNullable();
        table.enum("role", ["admin", "user"]).notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}