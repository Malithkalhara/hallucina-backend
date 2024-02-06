import Jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    const payload = {
        email: user.email,
        id: user.id,
        role: user.roll,
        first_name: user.first_name,
        last_name: user.last_name
    }
    return Jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : '30m'});
}
 
export const generateRefreshToken = (user) => {
    const payload = {
        email: user.email,
        id: user.id,
        role: user.roll,
        first_name: user.first_name,
        last_name: user.last_name
    }
    const refreshToken = Jwt.sign(payload,process.env.JWT_REFRESH_KEY, {expiresIn : '1d'});
    return refreshToken;
}
