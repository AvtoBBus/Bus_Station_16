drop table Expenses
create table Expenses(
	Id integer identity not null,
	UserId integer not null,
	ExpenseDescription nvarchar(512) not null,
	Amount money not null,
	CreationDate DATE not null,
	Category nvarchar(128) not null
);

insert into Expenses(UserId,ExpenseDescription,Amount,CreationDate,Category)
values(1,'test', 1924.00,GETDATE(), 0)