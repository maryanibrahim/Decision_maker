-- Inserting choices for Alice's poll with all options
INSERT INTO choices (poll_id, option1, option1_description, option2, option2_description, 
    option3, option3_description, option4, option4_description) 
VALUES (1, 
 'Choice A for Alice', 'This is a description for Choice A', 'Choice B for Alice', 'Description for Choice B', 
        'Choice C for Alice', 'Description for Choice C', 'Choice D for Alice', 'Description for Choice D');

-- Inserting choices for Kira's poll with all options
INSERT INTO choices (poll_id, option1, option1_description, option2, option2_description, 
   option3, option3_description, option4, option4_description) 
VALUES (2, 
    'Choice A for Kira', 'This is a description for Choice A', 'Choice B for Kira', 'Description for Choice B', 
    'Choice C for Kira', 'Description for Choice C', 'Choice D for Kira', 'Description for Choice D');