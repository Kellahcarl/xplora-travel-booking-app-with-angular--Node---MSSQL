CREATE PROCEDURE [dbo].[updateTour]
	(@tour_id varchar(100),
  @tour_name varchar(100),
  @tour_description varchar(250),
  @tour_img varchar(250),
  @price int,
  @start_date date,
  @end_date date)
as

set nocount on;

begin
	UPDATE dbo.tours
	SET 
	tour_id = @tour_id,
	tour_name = @tour_name ,	
	tour_description = @tour_description ,
	tour_img = @tour_img ,
    price = @price  ,
    start_date = @start_date,
    end_date = @end_date
	
	WHERE tour_id = @tour_id ;
end;