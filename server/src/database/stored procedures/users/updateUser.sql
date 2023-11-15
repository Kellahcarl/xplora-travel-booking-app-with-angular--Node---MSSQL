CREATE OR ALTER  PROCEDURE [dbo].[updateUser]
	@id varchar(100),
	@fullName varchar(100),
	@email varchar(250)
	as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	fullName=@fullName,
	email=@email 	
	WHERE _id = @id;
end;