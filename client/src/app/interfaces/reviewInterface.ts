export interface CreateReview {
  tour_id: string
  reviewer_id: string
  review_content: string
  review_rating : number
}

export interface UpdateReview {
  review_id : string
  tour_id: string;
  reviewer_id: string;
  review_content: string;
  review_rating: number;
}
