CREATE or alter PROCEDURE [dbo].[updateBooking]
	(@booking_id varchar(100),
  @user_id varchar(100),
  @tour_id varchar(100),
  @total_price int,
  
  @count int )
as

set nocount on;

begin
	UPDATE dbo.bookings
	SET 
    user_id =@user_id,
	tour_id = @tour_id,
	total_price = @total_price ,	
	count = @count    
	
	WHERE booking_id = @booking_id ;
end;