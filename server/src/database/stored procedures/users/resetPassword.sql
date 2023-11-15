CREATE OR ALTER  PROCEDURE [dbo].[resetPassword]
	(@id varchar(100),@password varchar(100))
as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	password=@password
	WHERE _id = @id;
end;