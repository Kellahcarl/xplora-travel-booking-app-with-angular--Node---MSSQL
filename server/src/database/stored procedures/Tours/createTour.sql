

CREATE OR ALTER PROCEDURE [dbo].[createTour]
	   (@tour_id varchar(100),
  @tour_name varchar(100),
  @tour_description varchar(250),
  @tour_img varchar(250),
  @price int,
  @start_date date,
  @end_date date)
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.tours
    (tour_id ,
	tour_name ,	
	tour_description ,
	tour_img ,
    price ,
    start_date ,
    end_date)
    VALUES
    (@tour_id ,
	@tour_name ,	
	@tour_description ,
	@tour_img ,
    @price ,
    @start_date ,
    @end_date)
END