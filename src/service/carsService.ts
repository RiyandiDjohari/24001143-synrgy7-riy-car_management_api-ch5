import { Request, Response } from "express";
import { CarsModels } from "../models/cars.model";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../middleware/cloudinary";

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
  const cars = await CarsModels.query().withGraphFetched("orders");
  if (cars) {
    res.status(200).json({ message: "Success", cars });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getCarsById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const car = await CarsModels.query().findById(id).withGraphFetched("orders").throwIfNotFound();

  if (car) {
    res.status(200).json({ message: "Get car by id success", car });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const createCar = async (req: Request, res: Response) => {
  // const { id, plate, manufacture, model, image, capacity, description, transmission, type, year, option, specs }: Car = req.body;
  const payload: Car = req.body;

  if (payload) {
    const car = await CarsModels.query().insert({
      id: uuidv4(),
      ...payload,
    });
    res.status(201).json({ message: "Create new car successfully", car });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteCarById = async (req: Request, res: Response) => {
  let id: string = req.params.id;

  const deletedCar = await CarsModels.query().deleteById(id);
  if (deletedCar) {
    res.status(200).json({ message: `Delete car with id ${id} Success` });
  } else {
    res.status(404).json({ message: `Car with id ${id} not found` });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload: Car = req.body;

  const updatedCars = await CarsModels.query()
    .findById(id)
    .update({
      id: id,
      ...payload,
    });

  if (updatedCars) {
    res.status(200).json({ message: `Cars with id ${id} Updated` });
  } else {
    res.status(400).json({ message: `Cars with id ${id} not found` });
  }
};

export const uploadImageHandler = async (req: Request, res: Response) => {
  const fileBase64 = req.file?.buffer.toString("base64");
  const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

  try {
      const result = await   cloudinary.uploader.upload(file, function(err, result){
    if (!!err) {
      return res.status(400).json({
        message: "Gagal Upload File!",
      });
    }

    res.status(201).json({ message: "Uploaded!", url: result?.url });
  });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error uploading image' })
  }
}
