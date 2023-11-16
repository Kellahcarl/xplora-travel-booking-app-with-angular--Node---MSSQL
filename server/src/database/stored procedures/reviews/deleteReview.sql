CREATE OR ALTER  PROCEDURE [dbo].[deleteReview]
	@review_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.reviews
	SET isDeleted = 1
	
	WHERE review_id = @review_id;
end;