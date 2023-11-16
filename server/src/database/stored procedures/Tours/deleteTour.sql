CREATE OR ALTER  PROCEDURE [dbo].[deleteTour]
	@tour_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.tours
	SET isDeleted = 1
	
	WHERE tour_id = @tour_id;
end;