# README.md

## Description
This is a project for Challenge Chapter 5 - SYNRGY 7. The project is simple CRUD application for a cars management system with upload image features using Cloudinary. 

## Installation
To install this API, you need to have Node.js installed on your machine. You can download it [here](https://nodejs.org/en/). After installing Node.js, you can clone this repository by running the following command in your terminal:

```bash
git clone https://github.com/RiyandiDjohari/24001143-synrgy7-riy-car_management_api-ch5.git
```

After cloning the repository, navigate to the project directory and run the following command to install the dependencies:

```bash
npm install
```

After installing the dependencies, you need to copy the `.env.example` file to `.env` and fill in the necessary environment variables.

```bash
cp .env.example .env
```

## Usage
To start the API, run the following command in your terminal:

```bash
npm start
```

The API will be running on `http://localhost:8000`.

## ERD
![ERD](https://res.cloudinary.com/df25q8a0m/image/upload/v1717571146/erd_challenge_chapter_5.png)

## Documentation API Postman
[Documentation API using Postman](https://documenter.getpostman.com/view/15078650/2sA3QzZ7wq)

## Endpoints
The following are the available endpoints:

### Cars
- GET `/api/v1/cars` - Get all cars
- POST `/api/v1/cars` - Create a new car
- GET `/api/v1/cars/:id` - Get a car by ID
- PUT `/api/v1/cars/:id` - Update a car by ID
- DELETE `/api/v1/cars/:id` - Delete a car by ID

### Orders
- GET `/api/v1/orders` - Get all orders
- GET `/api/v1/orders/:id` - Get order by ID
- POST `/api/v1/orders` - Create a new order
- PUT `/api/v1/orders/:id` - Update a order by ID
- DELETE `/api/v1/orders/:id` - Delete a order by ID

## Authors
- Riyandi Dwitama Djohari - [GitHub]("https://github.com/RiyandiDjohari/")

## Acknowledgements
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex.js](http://knexjs.org/)
- [Cloudinary](https://cloudinary.com/)
- [Typescript](https://typescriptlang.org/)

## Additional Notes
This project is part of the Synrgy Academy Full Stack Web Development Bootcamp. This project is for educational purposes only.