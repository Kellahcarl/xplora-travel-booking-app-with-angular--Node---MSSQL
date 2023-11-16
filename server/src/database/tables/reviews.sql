CREATE  TABLE reviews (
	review_id varchar(100) NOT NULL PRIMARY KEY,
	user_id varchar(100) NOT NULL ,
	tour_id varchar(100) NOT NULL,
	review_content varchar(250) not null,
    review_rating int not null,
	isDeleted BIT Default 0,
	review_date TIMESTAMP,
	FOREIGN KEY (tour_id) REFERENCES tours(tour_id),
	FOREIGN KEY (user_id) REFERENCES users(_id)
)

drop TABLE reviews