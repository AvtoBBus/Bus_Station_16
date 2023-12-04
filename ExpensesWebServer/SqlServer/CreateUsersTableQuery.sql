drop table Users
create table Users(
	Id integer IDENTITY not null,
	UserLogin nvarchar(256) not null unique,
	UserPassword varchar(256) not null,
	Salt varchar(256) not null unique,
);
INSERT into dbo.Users(UserLogin,UserPassword,Salt) 
VALUES('Andrey', '$2a$11$3cidDkMLGWFxnrc13.gwMuohNDzDpS7ziaedap5bK2gQup9uqoKG.', '$2a$11$3cidDkMLGWFxnrc13.gwMu');