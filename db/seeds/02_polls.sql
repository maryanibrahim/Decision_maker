-- Inserting a sample poll created by Alice
INSERT INTO polls (user_id, title, admin_link, submission_link) VALUES ('1', 'food', 'admin123', 'submit123');

-- Inserting a sample poll created by Kira
<<<<<<< HEAD
<<<<<<< HEAD
INSERT INTO polls (email, admin_link, submission_link) VALUES ('kira@example.com', 'admin456', 'submit456');
=======
INSERT INTO polls (creator_email, admin_link, submission_link) VALUES ('kira@example.com', 'admin456', 'submit456');
>>>>>>> 409f49a4a026b1ada0798cb1b4597de4c9a86b83
=======
INSERT INTO polls (user_id, title, admin_link, submission_link) VALUES ('2', 'friday night', 'admin456', 'submit456');
>>>>>>> 7f664cc08bc644297e11f5854886636612210ef8
