CREATE OR ALTER  PROCEDURE [dbo].[registerUser]
	@id varchar(100),
	@fullName varchar(100),	
	@email varchar(250),
	@password varchar(250)
	
as

set nocount on;

begin
	INSERT INTO dbo.users
	(_id, fullName, email, password )
	VALUES
	(@id,@fullName, @email, @password );
end;