

CREATE OR ALTER PROCEDURE [dbo].[createBooking]
	   (@booking_id varchar(100),
  @user_id varchar(100),
  @tour_id varchar(100),
  @total_price int,  
  @count int )
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.bookings
    (booking_id ,
	user_id ,
	tour_id ,
    total_price ,    
    	count 	)
    VALUES
    (@booking_id ,
  @user_id ,
  @tour_id ,
  @total_price ,
  @count )
END