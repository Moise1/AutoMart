import jwt from 'jsonwebtoken';
import CONFIG from '../config/config';


const tokenExists = (req, res, next) => {
    if (req.headers.authorization === undefined) return res.status(400).json({
        status: 400,
        error: 'Sorry, no token provided!'
    });
    next();
};

const userAccess = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({
        status: 401,
        message: 'Access  Denied.'
    });
    try {
        const decryptedToken = jwt.verify(token, CONFIG.secretOrPublicKey);
        req.user = decryptedToken;
        return next();

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error
        });
    }
};

const sellerAccess = (req, res, next) => {
    if (req.user.is_seller === true) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            message: 'Sorry, seller access only!'
        })
    }
};

const buyerAccess = (req, res, next) => {
    if (req.user.is_buyer === true) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            message: 'Sorry, only buyer access only!'
        })
    }
};

const adminAccess = (req, res, next) => {
    if (req.user.is_admin === true) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            messsage: 'Sorry! admin access only!'
        });
    }
};



export {
    tokenExists,
    userAccess,
    sellerAccess,
    buyerAccess,
    adminAccess
};