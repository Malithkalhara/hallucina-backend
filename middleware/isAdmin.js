import Jwt from 'jsonwebtoken';


export const isAdmin = (req, res, next) => {
    if (req.user.roll == 'admin') {
        console.log("Admin is here!")
        next();
    } else {
        console.log("Unauthorized!")
        return res.sendStatus(403);
    }
}