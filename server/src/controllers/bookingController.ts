import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";
import {
  validateBooking,
  validateBookingId,
  validateUpdateBooking,
  validateUserId,
} from "../validators/bookingValidator";
import { Booking } from "../types/bookingInterface";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { tour_id, user_id, count, total_price } = req.body;

    // console.log(req.body);

    const { error } = validateBooking.validate(req.body);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newBooking: Booking = {
      booking_id: uuidv4(),
      tour_id,
      user_id,
      count,
      total_price,
    };

    const procedure = "createBooking";
    const params = newBooking;

    await execute(procedure, params);
    return res.send({ message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const {
      booking_id,
      tour_id,
      user_id,
      count,
      total_price
  
    } = req.body;

    const { error } = validateUpdateBooking.validate(req.body);
    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Booking = {
      booking_id,
      tour_id,
      user_id,
      count,
      total_price,
     
    };

    const ProcedureName = "updateBooking";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "booking updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking_id = req.params.booking_id;
    if (!booking_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateBookingId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: "please input id" });

    const procedureName = "deleteBooking";
    await execute(procedureName, { booking_id });

    res.status(201).send({ message: "booking deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking_id = req.params.booking_id;
    // console.log(id);
    if (!booking_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateBookingId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ error: error.details[0].message });

    const procedureName = "getBookingById";
    const result = await execute(procedureName, { booking_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
export const getBookings = async (req: Request, res: Response) => {
  try {
    const procedureName = "getBookings";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    // console.log(user_id);
    if (!user_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateUserId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ error: error.details[0].message });

    const procedureName = "getUserBookings";
    const result = await execute(procedureName, { user_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};