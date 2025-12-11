const mongoose = require('mongoose');
const {PASS_LENGTH, HTTP_CODES} = require('../../config/Enum');
const CustomError = require('../../lib/Error');
const bcrypt = require('bcrypt');
const {DEFAULT_LANG} = require("../../config");
const validator = require("validator");

const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    first_name: String,
    last_name: String,
    phone_number: String,
    language: {type: String, default: DEFAULT_LANG}
}, { timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
});

class Users extends mongoose.Model {

    validPassword(password){
        return bcrypt.compareSync(password, this.password);
    }


    static validateFieldsBeforeAuth(email, password){
        
        if(typeof password !== "string" || password.length < PASS_LENGTH || !validator.isEmail()){
            throw new CustomError(HTTP_CODES.NOT_AUTHORIZED, "Validation Error", "Email or password wrong");
        }
        return null;
    }
}

schema.loadClass(Users);
module.exports = mongoose.model('users', schema);
