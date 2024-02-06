-- Create User table
CREATE TABLE buildit.User (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    contact_number INT
    -- Add other relevant user information columns
);

-- Create ServiceCategory table
CREATE TABLE buildit.ServiceCategory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_name VARCHAR(255)
);

-- Create Post table
CREATE TABLE buildit.Post (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255),
    sub_title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    created_on DATE,
    user_id UUID,
    category_id UUID,
    features TEXT[],
    contact_email TEXT,
    contact_number INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES buildit.user(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES buildit.servicecategory(id)
);

-- Create Image table
CREATE TABLE buildit.Image (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID,
    image_url VARCHAR(255),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";