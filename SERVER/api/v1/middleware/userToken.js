import jwt from "jsonwebtoken";
import keys from "../config/config";


const tokenExists = (req, res, next) => {
    if (req.headers.authorization === undefined) return res.status(400).json({
        status: 400,
        error: "Sorry, no token provided!"
    });
    next();
};

const userAccess = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({
        status: 401,
        message: "Access Denied."
    });
    
    try {
        const decryptedToken = jwt.verify(token, keys.SECRET_OR_PUBLIC_KEY);
        req.user = decryptedToken;
        next();

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error
        });
    }
};

const adminAccess = (req, res, next) => {
    if (req.user.is_admin === true) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            messsage: "Sorry! Only admin authorized!"
        });
    }
};



export {
    tokenExists,
    userAccess,
    adminAccess
};