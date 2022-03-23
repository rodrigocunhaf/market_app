const UserModel = require('./model');

class UserRepositorie {

    save = async (objectUser) =>{
        return objectUser.save();
    }

    findOne = async (query) =>{
        return UserModel.findOne(query);
    }
}

module.exports = new UserRepositorie ();