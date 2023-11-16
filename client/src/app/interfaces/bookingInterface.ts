export interface CreateBooking{
  tour_id: string
  user_id: string
  count: number
  total_price: number
  start_date: Date
  end_date :Date
}

export interface UpdateBooking {
  booking_id: string
  tour_id: string;
  user_id: string;
  count: number;
  total_price: number;
  start_date: Date;
  end_date: Date;
}
