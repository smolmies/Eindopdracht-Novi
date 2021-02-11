INSERT INTO role(name) VALUES('ROLE_USER');
INSERT INTO role(name) VALUES('ROLE_MODERATOR');
INSERT INTO role(name) VALUES('ROLE_ADMIN');

INSERT INTO users (user_id, username, password, phone_number, email)
 values ('1','user', 'useruser', '123-456-7890', 'user@user.nl');
 INSERT INTO users (user_id, username, password, phone_number, email)
 values ('2','admin', 'adminadmin', '043-4567891', 'admin@admin.nl');
 INSERT INTO users (user_id, username, password, phone_number, email)
 values ('3','moderator', 'moderator', '06-4567890', 'moderator@moderator.nl');

alter sequence tableseq restart with 4;
