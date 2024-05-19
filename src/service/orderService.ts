import { Request, Response } from "express";
import { OrdersModel } from "../models/orders.model";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await OrdersModel.query().withGraphFetched("user").withGraphFetched('car');

  if (orders) {
    res.status(200).json({ message: "Success", orders });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getOrdersById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const order = await OrdersModel.query().findById(id).withGraphFetched("user").withGraphFetched("car").throwIfNotFound();

  if (order) {
    res.status(200).json({ message: "Get order by id success", order });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const payload: { start_rent: Date; finish_rent: Date; status: string; user_id: number; car_id: string } = req.body;
  const ordersLength: number = (await OrdersModel.query()).length;

  if (payload) {
    const order = await OrdersModel.query().insert({
      id: ordersLength + 1,
      ...payload,
    });
    res.status(201).json({ message: "Create new order successfully", order });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  let id: string = req.params.id;

  const deletedOrder = await OrdersModel.query().deleteById(id);
  if (deletedOrder) {
    res.status(200).json({ message: `Delete Order with id ${id} Success` });
  } else {
    res.status(404).json({ message: `Order with id ${id} not found` });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload = req.body;

  const updatedOrder = await OrdersModel.query().findById(id).update(payload);

  if (updatedOrder) {
    res.status(200).json({ message: `Order with id ${id} Updated` });
  } else {
    res.status(400).json({ message: `Order with id ${id} not found` });
  }
};
