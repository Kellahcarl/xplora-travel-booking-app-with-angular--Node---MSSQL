CREATE  TABLE tours (
	tour_id varchar(100) NOT NULL PRIMARY KEY,
	tour_name varchar(100) NOT NULL,	
	tour_description varchar(250) NOT NULL,
	tour_img varchar(250),
    price int not null,
    start_date date not null,
    end_date date not null,	
	isDeleted BIT Default 0,
)

Drop TABLE tours