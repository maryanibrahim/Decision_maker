-- Inserting a sample poll created by Alice
INSERT INTO polls (email, admin_link, submission_link) VALUES ('alice@example.com', 'admin123', 'submit123');

-- Inserting a sample poll created by Kira
<<<<<<< HEAD
INSERT INTO polls (email, admin_link, submission_link) VALUES ('kira@example.com', 'admin456', 'submit456');
=======
INSERT INTO polls (creator_email, admin_link, submission_link) VALUES ('kira@example.com', 'admin456', 'submit456');
>>>>>>> 409f49a4a026b1ada0798cb1b4597de4c9a86b83
