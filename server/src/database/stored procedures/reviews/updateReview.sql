CREATE PROCEDURE [dbo].[updateReview]
	(@review_id varchar(100) ,
	@reviewer_id varchar(100)  ,
	@tour_id varchar(100),
	@review_content varchar(250),
    @review_rating int)
as

set nocount on;

begin
	UPDATE dbo.reviews
	SET 
    review_id= @review_id ,
	user_id = @reviewer_id ,
	tour_id = @tour_id ,
	review_content = @review_content ,
    review_rating = @review_rating
	
	WHERE review_id = @review_id ;
end