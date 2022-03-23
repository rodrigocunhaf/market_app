const dotenv = require('dotenv');
const path = require('path');


if ( process.env.NODE_ENV === "development" ){
    dotenv.config({path:"./src/configuration/environment/envs/development.env"})
}


if ( process.env.NODE_ENV === "testing" ){
    dotenv.config({path:"./src/configuration/environment/envs/testing.env"})
}

if ( process.env.NODE_ENV === "production" ){
    dotenv.config({path:"./src/configuration/environment/envs/testing.env"})
}



