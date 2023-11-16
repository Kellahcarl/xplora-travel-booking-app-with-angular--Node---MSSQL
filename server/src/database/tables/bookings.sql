CREATE  TABLE bookings (
	book_id varchar(100) NOT NULL PRIMARY KEY,
	tour_id varchar(100) NOT NULL ,
	user_id varchar(100) NOT NULL,
	count int not null,
    total_price int not null,
    start_date date not null,
    end_date date not null,	
	isDeleted BIT Default 0,
	FOREIGN KEY (tour_id) REFERENCES tours(tour_id),
	FOREIGN KEY (user_id) REFERENCES users(_id)
)
