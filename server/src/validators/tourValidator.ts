import Joi from "joi";

export const validateTour = Joi.object().keys({
  tour_name: Joi.string().required(),
  tour_description: Joi.string().min(5).required(),
  tour_img:Joi.string().min(5).required(),
  price : Joi.number().required(),
  start_date : Joi.date().required(),
  end_date : Joi.date().required(),
});

export const validateUpdateTour = Joi.object().keys({
  tour_id: Joi.string().min(8).required(),
  tour_name: Joi.string().required(),
  tour_description: Joi.string().min(2).required(),
  tour_img: Joi.string().min(5).required(),
  price: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
});


export const validateTourId = Joi.object().keys({
  tour_id: Joi.string().min(8).required(),

});
