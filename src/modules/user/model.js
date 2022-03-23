const { Schema , mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name:{
        type:"String",
        required:true,
        validate: ( value ) => {
            const nameSplitted = value.split(' ');
            if (nameSplitted.length < 2){
                throw new Error( 'Name must contain at least 2 words')
            }
        }

    },

    email:{
        type:"String",
        required:true,
        lowercase:true,
        unique:true,
        validate: (value) => {
            const valueArray = value.split('');

            const indexValueCharacter = valueArray.findIndex( element => element === '@');

            const preName = value.slice(0, indexValueCharacter);

            if (!validator.isEmail(value)){
                throw new Error('Invalid email.')
            }

            if (validator.isNumeric(preName)){
                throw new Error('The email must contain at least one letter.')
            }
        }

    },

    password:{
        type:"String",
        required:true
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});


UserSchema.methods.setToken = async function (){

    const token = jwt.sign(this.id, process.env.JWT_SECRET);

    this.tokens[0] = { token }

    await this.save();

};


UserSchema.methods.toJSON = function (){

    const dataUser = this.toObject()
    
    delete dataUser.password;

    delete dataUser._id;

    delete dataUser.__v

    if (dataUser.tokens.length > 0) {
        dataUser.token = this.tokens[0].token;
    }

    delete dataUser.tokens;

    return dataUser;
}       


UserSchema.statics.loginUser =  async (ObjectBody) =>{
    
    const user = await UserModel.findOne({email:ObjectBody.email});

    if (!user){
        throw new Error ('Invalid username');
    }

    const passwordValidation =  await bcrypt.compare(ObjectBody.password,user.password)

    if (!passwordValidation){
        throw new Error('Invalid password');
    }

    return user
}

UserSchema.pre("save", async function () {

    if (this.isModified('password')){
            const encryptedPassword = await bcrypt.hash(this.password, 10);

            this.password = encryptedPassword;

    }

})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;