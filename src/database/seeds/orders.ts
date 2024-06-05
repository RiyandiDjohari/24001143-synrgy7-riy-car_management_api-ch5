import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("orders").del();

    // Inserts seed entries
    await knex("orders").insert([
        { id: 1, start_rent: "2024-05-18", finish_rent: "2024-05-20", status: "Rent", user_id: 1, car_id: "6e2bc663-5197-441a-957b-bc75e4a2da7c"},
        { id: 2, start_rent: "2024-05-16", finish_rent: "2024-05-17", status: "Finish", user_id: 2, car_id: "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77"},
        { id: 3, start_rent: "2024-05-18", finish_rent: "2024-05-20", status: "Rent", user_id: 3, car_id: "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77"},
    ]);
    
};
