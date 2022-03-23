const UserModel = require('../user/model');
const jwt = require('jsonwebtoken');

const authentication =  async  ( req, res , next) => {
    const bearerToken = req.header('Authorization').replace('Bearer','').trim();
    
    try {

        const isValidToken =  jwt.verify(bearerToken,process.env.JWT_SECRET);

        const user = await UserModel.findById(isValidToken);

        req.user = user;

        next();

    } catch ( err ){
        res.status(403).send({
            statusCode:403,
            message:"Access denied."
        });
    };
};

module.exports = authentication;