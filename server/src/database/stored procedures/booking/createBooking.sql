

CREATE OR ALTER PROCEDURE [dbo].[createBooking]
	   (@booking_id varchar(100),
  @user_id varchar(100),
  @tour_id varchar(100),
  @total_price int,
  @start_date date,
  @end_date date,
  @count int )
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.bookings
    (booking_id ,
	user_id ,
	tour_id ,
    total_price ,
    start_date,
    end_date,
    	count 	)
    VALUES
    (@booking_id ,
  @user_id ,
  @tour_id ,
  @total_price ,
  @start_date ,
  @end_date ,
  @count )
END