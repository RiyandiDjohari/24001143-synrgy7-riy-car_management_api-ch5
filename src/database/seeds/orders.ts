import { Knex } from "knex";
import { v4 as uuidv4} from "uuid";
import {faker} from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("orders").del();

    // Inserts seed entries
    await knex("orders").insert([
        { id: uuidv4(), start_rent: faker.date.recent(), finish_rent: faker.date.future(), price: 150000, status: "Rent", user_id: "f6ffdc60-c5aa-4790-aa34-1849994f8722", car_id: "6e2bc663-5197-441a-957b-bc75e4a2da7c"},
        { id: uuidv4(), start_rent: faker.date.recent(), finish_rent: faker.date.future(), price: 300000, status: "Rent", user_id: "92551e74-9cfd-401a-b852-b0fdcab2b7cf", car_id: "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77"},
        { id: uuidv4(), start_rent: faker.date.recent(), finish_rent: faker.date.future(), price: 250000, status: "Rent", user_id: "4bed27c1-b806-437d-ac81-8be5041e6292", car_id: "23574b8f-3e89-4685-a348-67c1f7e5b3c4"},
        { id: uuidv4(), start_rent: faker.date.recent(), finish_rent: faker.date.future(), price: 200000, status: "Rent", user_id: "166d6261-27d2-49bd-b711-4b15c622606e", car_id: "3eead6db-c536-406b-9bc5-85d4c6e38a76"},
        { id: uuidv4(), start_rent: faker.date.recent(), finish_rent: faker.date.future(), price: 350000, status: "Rent", user_id: "09aad708-a7d5-4a90-888f-f081348ca3af", car_id: "752685ce-dd39-40e5-9af5-93fdd36dea7e"},
    ]);
    
};
