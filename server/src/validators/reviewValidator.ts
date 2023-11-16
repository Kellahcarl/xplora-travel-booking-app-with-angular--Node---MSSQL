import Joi from "joi";

export const validateReview = Joi.object().keys({
  tour_id: Joi.string().min(8).required(),
  reviewer_id: Joi.string().min(8).required(),
  review_content: Joi.string().min(5).required(),
  review_rating: Joi.number().min(1).required(),
});

export const validateUpdateReview = Joi.object().keys({
    review_id : Joi.string().min(8).required(),
  tour_id: Joi.string().min(8).required(),
  reviewer_id: Joi.string().min(8).required(),
  review_content: Joi.string().min(5).required(),
  review_rating: Joi.number().min(1).required(),
});

export const validateReviewId = Joi.object().keys({
  review_id: Joi.string().min(8).required(),
});
