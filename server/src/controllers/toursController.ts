import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";
import {
  validateTour,
  validateTourId,
  validateUpdateTour,
} from "../validators/tourValidator";
import { Tour } from "../types/tourInterface";

export const createTour = async (req: Request, res: Response) => {
  try {
    const {
      tour_name,
      tour_description,
      tour_img,
      price,
      start_date,
      end_date,
    } = req.body;

    // console.log(req.body);

    const { error } = validateTour.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newTour: Tour = {
      tour_id: uuidv4(),
      tour_name,
      tour_description,
      tour_img,
      price,
      start_date,
      end_date,
    };

    const procedure = "createTour";
    const params = newTour;

    await execute(procedure, params);
    return res.send({ message: "Tour created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
export const updateTour = async (req: Request, res: Response) => {
  try {
    const {
      tour_id,
      tour_name,
      tour_description,
      tour_img,
      price,
      start_date,
      end_date,
    } = req.body;
    // console.log(req.body);

    const { error } = validateUpdateTour.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Tour = {
      tour_id,
      tour_name,
      tour_description,
      tour_img,
      price,
      start_date,
      end_date,
    };

    const ProcedureName = "updateTour";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Tour updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateTourId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: "please input id" });

    const procedureName = "deleteTour";
    await execute(procedureName, { tour_id });

    res.status(201).send({ message: "Tour deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour_id = req.params.tour_id;
    // console.log(tour_id);
    if (!tour_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateTourId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "getTourById";
    const result = await execute(procedureName, { tour_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
export const getTours = async (req: Request, res: Response) => {
  try {
    const procedureName = "getTours";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
