CREATE OR ALTER  PROCEDURE [dbo].[forgotPassword]
	(@id varchar(100))
as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	resetPassword=1
	WHERE _id = @id;
end;