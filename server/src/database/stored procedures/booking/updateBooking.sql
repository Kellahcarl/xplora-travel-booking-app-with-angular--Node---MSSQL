CREATE PROCEDURE [dbo].[updateBooking]
	(@booking_id varchar(100),
  @user_id varchar(100),
  @tour_id varchar(100),
  @total_price int,
  @start_date date,
  @end_date date,
  @count int )
as

set nocount on;

begin
	UPDATE dbo.bookings
	SET 
    user_id =@user_id,
	tour_id = @tour_id,
	total_price = @total_price ,	
	count = @count,
    start_date = @start_date,
    end_date = @end_date
	
	WHERE booking_id = @booking_id ;
end;