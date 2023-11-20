CREATE OR ALTER  PROCEDURE [dbo].[updateUserImage]
	@ImageUrl varchar(250),
    @user_id varchar(100)
	
	as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	imageUrl=@ImageUrl
	
	WHERE _id = @user_id;
end;