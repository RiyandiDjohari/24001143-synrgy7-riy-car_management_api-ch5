import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, username: "john doe", email: "johndoe@mail.com", password: '12345', role: "user" },
        { id: 2, username: "jane doe", email: "janedoe@mail.com", password: '12345', role: "user" },
        { id: 3, username: "june doe", email: "junedoe@mail.com", password: '12345', role: "user" },
        { id: 4, username: "jesy doe", email: "jesydoe@mail.com", password: '12345', role: "user" },
        { id: 5, username: "josh doe", email: "joshdoe@mail.com", password: '12345', role: "user" },
    ]);
};
