import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtil.js";
import RefreshToken from "../models/refreshToken.model.js";


export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ name: 1 }); // 1 for ascending order, -1 for descending
        
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
}


export const register = async (req, res) => {
    try{
        const { email, password, name } = req.body;
        const role = 'user'
        let userExists = await User.findOne({email})
        if (userExists) {
            
            res.status(401).json({message:"User already exists."});
            return;
        }

        const saltRounds = 10;

        bcrypt.hash(password,saltRounds,(err, hash)=>{
            if(err) {
                res.json({message: "Internal Server Error!"});
            };

            let user = new User({
                email,
                password : hash,
                name,
                role
            });

            user.save().then(async ()=>{
                const createdUser =await User.findOne({email})
                res.status(201).json({message: "User created successfully",id: createdUser?._id});
            }).catch(err => {
                
                res.status(401).json({message: err.message});
            })
        });
    }catch(err){
        return res.status(401).send(err.message);
    }
}

export const login = async (req, res) => {
    
    try{
        console.log("Login")
        const {email , password} = req.body;
        let user = await User.findOne({email});

        if(!user) {
            
            return res.status(401).json({message: "Invalid Credentials"});
        }
        bcrypt.compare(password, user.password, async (err, result)=>{
            if(result){
                var response = {
                    message: null,
                    accessToken: null,
                    refreshToken: null,
                    name:user.name,
                    id:user._id,
                    email:user.email,
                    role:user.role
                }
                if(await RefreshToken.exists({userId: user._id})) {
                    const refreshTokenRecord = await RefreshToken.findOne({userId: user._id});
                    response.refreshToken = refreshTokenRecord.token;
                    response.message = user.email + " user already logged in!";
                    
                }else{
                    response.refreshToken = generateRefreshToken(user);
                    response.message = user.email + " user logged in!";
                    
                }
                response.accessToken = generateAccessToken(user);
                
                return res.status(200).json(response);
            }
            
            
            return res.status(401).json({message: "Invalid Credentials"});
        });
    }catch(err){
        
        return res.status(500).send(err.message);
    }   
}

export const logout = async (req,res) => {
    
    const userId = req.body.userId;
    try{
        await RefreshToken.deleteOne({userId: userId}).then((result)=>{
            
            
            
            res.status(200).json({message: "user logged out"});
        }
        ).catch((err)=>{
            
            
        });
        
    }catch(err){
        
        res.status(500).json({message: "error while logging out!"});
    }
}

export const token = async (req, res) => {
    const token = req.body.refreshToken;
    if (token == null) return res.status(401).json({message: "refresh token is null"});
    Jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user)=>{

        if (err) {
            
            return res.sendStatus(403);
        }
        const accessToken = generateAccessToken(user);
        
        return res.status(200).json({accessToken});
    })
}
