import { Request, Response } from "express";
import { CarsModels } from "../models/cars.model";
import { v4 as uuidv4 } from "uuid";
import { uploadImageHandler } from "../utils";

interface Car {
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  capacity: number;
  description: string;
  transmission: string;
  type: string;
  year: number;
  option: string[];
  specs: string[];
}

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await CarsModels.query().withGraphFetched("orders");
    if (cars) {
      res.status(200).json({ status: true, message: "Success", cars });
    } else {
      res.status(400).json({ status: false, message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const getCarsById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const car = await CarsModels.query().findById(id).withGraphFetched("orders").throwIfNotFound();

    if (car) {
      res.status(200).json({ status: true, message: `Get car with id ${id} success`, car });
    } else {
      res.status(400).json({ status: false, message: `Car with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    // const { id, plate, manufacture, model, image, capacity, description, transmission, type, year, option, specs }: Car = req.body;
    const image = await uploadImageHandler(req.file, "cars");

    const car = await CarsModels.query().insert({
      ...req.body,
      id: uuidv4(),
      image: image.secure_url,
    });

    if (!car) {
      res.status(400).json({ message: "Something Went Wrong" });
    }

    res.status(201).json({ message: "Create new car successfully", car });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const deleteCarById = async (req: Request, res: Response) => {
  try {
    let id: string = req.params.id;
    const deletedCar = await CarsModels.query().deleteById(id);

    if (deletedCar) {
      res.status(200).json({ status: true, message: `Delete car with id ${id} Success` });
    } else {
      res.status(404).json({ status: false, message: `Car with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload: Car = req.body;

    if (req.file) {
      const image = await uploadImageHandler(req.file, "cars");

      const updatedCars = await CarsModels.query()
        .findById(id)
        .update({
          ...payload,
          id,
          image: image.secure_url,
        });

      if (updatedCars) {
        res.status(200).json({ status: true, message: `Cars with id ${id} Updated` });
      } else {
        res.status(404).json({ status: false, message: `Cars with id ${id} not found` });
      }
    } else {
      const updatedCars = await CarsModels.query()
        .findById(id)
        .update({
          id,
          ...payload,
        });

      if (updatedCars) {
        res.status(200).json({ status: true, message: `Cars with id ${id} Updated` });
      } else {
        res.status(404).json({ status: false, message: `Cars with id ${id} not found` });
      }

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
