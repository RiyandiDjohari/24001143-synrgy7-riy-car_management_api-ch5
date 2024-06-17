import { Knex } from "knex";
import { v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: uuidv4(), name: "admin", username: "admin", email: "admin@mail.com", password: bcrypt.hashSync('admin', 10), role: "admin" },
        { id: uuidv4(), name: "john doe", username: "john doe", email: "johndoe@mail.com", password: bcrypt.hashSync('12345', 10), role: "user" },
        { id: uuidv4(), name: "jane doe", username: "jane doe", email: "janedoe@mail.com", password: bcrypt.hashSync('12345', 10), role: "user" },
        { id: uuidv4(), name: "june doe", username: "june doe", email: "junedoe@mail.com", password: bcrypt.hashSync('12345', 10), role: "user" },
        { id: uuidv4(), name: "jesy doe", username: "jesy doe", email: "jesydoe@mail.com", password: bcrypt.hashSync('12345', 10), role: "user" },
        { id: uuidv4(), name: "josh doe", username: "josh doe", email: "joshdoe@mail.com", password: bcrypt.hashSync('12345', 10), role: "user" },
    ]);
};
