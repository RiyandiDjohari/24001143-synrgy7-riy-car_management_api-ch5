import { Request, Response } from "express";
import { OrdersModel } from "../models/orders.model";
import { v4 as uuidv4 } from "uuid";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrdersModel.query().withGraphFetched("user").withGraphFetched("car");

    if (orders) {
      res.status(200).json({ status: true, message: "Success", orders });
    } else {
      res.status(400).json({ status: false, message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const getOrdersById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const order = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("user")
      .withGraphFetched("car")
      .throwIfNotFound();

    if (order) {
      res.status(200).json({ status: true, message: "Get order by id success", order });
    } else {
      res.status(400).json({ status: false, message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload: {
      start_rent: Date;
      finish_rent: Date;
      price: number;
      status: string;
      user_id: string;
      car_id: string;
    } = req.body;
    const ordersLength: number = (await OrdersModel.query()).length;

    if (payload) {
      const order = await OrdersModel.query().insert({
        id: uuidv4(),
        ...payload
      });
      res.status(201).json({ status: true, message: "Create new order successfully", order });
    } else {
      res.status(400).json({ status: false, message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    let id: string = req.params.id;

    const deletedOrder = await OrdersModel.query().deleteById(id);
    if (deletedOrder) {
      res.status(200).json({ status: true, message: `Delete Order with id ${id} Success` });
    } else {
      res.status(404).json({ status: false, message: `Order with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload = req.body;

    const updatedOrder = await OrdersModel.query().findById(id).update(payload);

    if (updatedOrder) {
      res.status(200).json({ status: true, message: `Order with id ${id} Updated` });
    } else {
      res.status(400).json({ status: false, message: `Order with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
