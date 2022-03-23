const UserRepositorie =  require("./repositorie.js");
const UserModel = require('./model');

class UserService {

    async createUser (objectUser){

        try {
            const newUser = new UserModel(objectUser);
            const newUserDatabase = await UserRepositorie.save(newUser);
            return newUserDatabase;

        } catch ( err ){
            if( err.message.slice(0,6) === 'E11000'){
                throw new Error('User already exists.')
            }
            throw new Error(err);
        };
    
    };

    async userLogin (objectBody){ 

        try {
            const user = await  UserModel.loginUser(objectBody);

            await user.setToken();

            return user;

        } catch ( err ){
            throw new Error(err);
        };

    };


    
}

module.exports = new UserService();