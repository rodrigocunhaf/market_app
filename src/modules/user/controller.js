const UserService = require('./service');


class UserController {

    async createController ( req, res ){
        
        const necessaryKeys = ['name','email','password'];

        const bodyKeys = Object.keys(req.body);

        const isValidBody = necessaryKeys.every( element => bodyKeys.includes(element));

        if (!isValidBody){
            return res.status(400).send({
                        statusCode:400,
                        message:'Invalid body'
                    })
        }

        try {

            const newUser = await UserService.createUser(req.body);
            
            return res.status(201).send({
                statusCode:201,
                message:'User created.'
            });

        } catch ( err ){
            res.status(400).send({
                statusCode:400,
                message:err.message
            })
        }
    };


    async loginUser ( req, res ){

        const necessaryKeys = ['email','password'];

        const bodyKeys = Object.keys(req.body);

        const isValidBody = necessaryKeys.every( element => bodyKeys.includes(element));

        if (!isValidBody){
            return res.status(400).send({
                        statusCode:400,
                        message:'Invalid body'
                    })
        }

        try {

            const user = await UserService.userLogin(req.body);
            
            return res.status(200).send(user);

        } catch ( err ){
            res.status(400).send({
                statusCode:400,
                message:err.message
            })
        }
    
    }
};

module.exports = new UserController();