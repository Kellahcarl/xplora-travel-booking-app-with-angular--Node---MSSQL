export interface CreateTour {

  tour_name: string;
  tour_description: string;
  tour_img: string;
  price: number;
  start_date: Date;
  end_date: Date;
}

export interface UpdateTour {
  tour_id :string
  tour_name: string;
  tour_description: string;
  tour_img: string;
  price: number;
  start_date: Date;
  end_date: Date;
}
