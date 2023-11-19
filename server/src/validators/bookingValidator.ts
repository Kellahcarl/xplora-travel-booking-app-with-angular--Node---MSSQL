import Joi from "joi";

export const validateBooking = Joi.object().keys({
  tour_id: Joi.string().min(8).required(),
  user_id: Joi.string().min(8).required(),
  count: Joi.number().min(1).required(),
  total_price: Joi.number().required(),
});

export const validateUpdateBooking = Joi.object().keys({
  booking_id: Joi.string().min(8).required(),
  tour_id: Joi.string().min(8).required(),
  user_id: Joi.string().min(8).required(),
  count: Joi.number().min(1).required(),
  total_price: Joi.number().required(),
});

export const validateBookingId = Joi.object().keys({
  booking_id: Joi.string().min(8).required(),
});


export const validateUserId = Joi.object().keys({
  user_id: Joi.string().min(8).required(),
});