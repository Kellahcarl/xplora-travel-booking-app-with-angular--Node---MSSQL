

CREATE OR ALTER PROCEDURE [dbo].[createReview]
	   (@review_id varchar(100) ,
	@reviewer_id varchar(100)  ,
	@tour_id varchar(100),
	@review_content varchar(250),
    @review_rating int )
AS

BEGIN
    set nocount on;

    INSERT INTO dbo.reviews
    (review_id ,
	user_id  ,
	tour_id ,
	review_content ,
    review_rating )
    VALUES
    (@review_id ,
	@reviewer_id  ,
	@tour_id ,
	@review_content ,
    @review_rating )
END