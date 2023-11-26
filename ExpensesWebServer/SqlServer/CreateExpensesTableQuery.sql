drop table Expenses
create table Expenses(
	Id integer identity not null,
	UserId integer not null,
	ExpenseDescription nvarchar(512) not null,
	Amount money not null,
	CreationDate DATETIME not null,
	Category integer not null
);

DECLARE @FormattedDateTime VARCHAR(16); -- Format 'dd-mm-yyyy hh-mm'
SET @FormattedDateTime = CONVERT(VARCHAR, GETDATE(), 105) + ' ' + LEFT(CONVERT(VARCHAR, GETDATE(), 108), 5);

insert into Expenses(UserId,ExpenseDescription,Amount,CreationDate,Category)
values(1,'Тестовая запись для пользователя Andrey', 1924.00,@FormattedDateTime, 0)