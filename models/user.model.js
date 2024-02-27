import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        
        validate: {
            validator: function (value) {
                return value.length >= 6
            },
            message: () => 'Password must be at least six characters long'
        }
    },
    email:{

        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email`
        },
        unique: true, 
    }
    ,
    name:{
        type: String,
        
    }
    , 
    role:{
        type: String,
        default: "user",
        
    }
    ,
    events:{
        type: [String],
    }
    ,
    otp:{
        type: String,
    }
},{timestamps:true})

const User = mongoose.model('Users', userSchema);

export default User;