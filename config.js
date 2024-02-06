import dotenv from 'dotenv';

dotenv.config({
    path: `${process.env.NODE_ENV}.env`
});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost', 
    PORT: process.env.PORT || 3000
};

export default config;
