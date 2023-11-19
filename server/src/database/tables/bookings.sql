CREATE  TABLE bookings (
	booking_id varchar(100) NOT NULL PRIMARY KEY,
	tour_id varchar(100) NOT NULL ,
	user_id varchar(100) NOT NULL,
	count int not null,
    total_price int not null,    
	isDeleted BIT Default 0,
	FOREIGN KEY (tour_id) REFERENCES tours(tour_id),
	FOREIGN KEY (user_id) REFERENCES users(_id)
)

Drop Table bookings