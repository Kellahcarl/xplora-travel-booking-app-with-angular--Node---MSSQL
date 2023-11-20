CREATE OR ALTER PROCEDURE [dbo].[getUserById]
	(@id varchar(250))
as

set nocount on;

begin
	select	_id,
			email,
			fullName,
			isAdmin,
			imageUrl
		
	from	users  where _id= @id and isDeleted = 0;
end;

exec getUserById 