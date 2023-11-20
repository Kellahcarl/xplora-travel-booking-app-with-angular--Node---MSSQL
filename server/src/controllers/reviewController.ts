import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";

import { Review } from "../types/ReviewInterface";
import { validateReview, validateReviewId, validateUpdateReview, validateUserId } from "../validators/reviewValidator";



export const createReview = async (req: Request, res: Response) => {
  try {
    const { tour_id, reviewer_id, review_content ,review_rating } =
      req.body;

    console.log(req.body);

    const { error } = validateReview.validate(req.body);

    if (error)
      return res
        .status(400)
        .send({ error: "please place correct details" });

    const newReview: Review = {
      review_id: uuidv4(),
      tour_id,
      reviewer_id,
      review_content,
      review_rating
    };

    const procedure = "createReview";
    const params = newReview;

    await execute(procedure, params);
    return res.send({ message: "review created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { review_id, tour_id, reviewer_id, review_content, review_rating } =
      req.body;

    const { error } = validateUpdateReview.validate(req.body);
    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Review = {
      review_id,
      tour_id,
      reviewer_id,
      review_content,
      review_rating,
    };

    const ProcedureName = "updateReview";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Review updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review_id = req.params.review_id;
    if (!review_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateReviewId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ error: "please input id" });

    const procedureName = "deleteReview";
    await execute(procedureName, { review_id });

    res.status(201).send({ message: "Review deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getReview = async (req: Request, res: Response) => {
  try {
    const review_id = req.params.review_id;
    // console.log(id);
    if (!review_id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateReviewId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ error: error.details[0].message });

    const procedureName = "getReviewById";
    const result = await execute(procedureName, { review_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
export const getReviews = async (req: Request, res: Response) => {
  try {
    const procedureName = "getReviews";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({error : "internal server error" });
  }
};

export const getUserReview = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    // console.log(id);
    if (!user_id) return res.status(400).send({ error: "Id is required" });

    const { error } = validateUserId.validate(req.params);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const procedureName = "getUserReview";
    const result = await execute(procedureName, { user_id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "internal server error" });
  }
};
