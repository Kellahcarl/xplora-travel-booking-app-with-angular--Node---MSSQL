CREATE or alter PROCEDURE [dbo].[getTours]
	
as

set nocount on;

begin
	select *  from tours 
    where isDeleted = 0
   
end;