"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("cars", (table) => {
            table.uuid("id").primary();
            table.string("plate", 30).notNullable();
            table.string("manufacture", 30).notNullable();
            table.string("model", 30).notNullable();
            table.string("image").notNullable();
            table.integer("rentPerDay", 30).notNullable();
            table.integer("capacity", 2).notNullable();
            table.string("description");
            table.timestamp("availableAt").notNullable();
            table.string("transmission", 20).notNullable();
            table.boolean("available").notNullable();
            table.string("type", 20).notNullable();
            table.integer("year", 4).notNullable();
            table.specificType("options", 'TEXT[]').notNullable();
            table.specificType("specs", 'TEXT[]').notNullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("cars");
    });
}
exports.down = down;
