import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.headers.token;
    //const refreshToken = req.cookies.refreshToken;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    errCode: 0,
                    message: "Token is not valid!",
                });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            errCode: 1,
            message: "You're not authenticated",
        });
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.providerId) {
            next();
        } else {
            res.status(403).json({
                errCode: 1,
                message: "You're not allowed to do that!",
            });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.providerId) {
            next();
        } else {
            res.status(403).json({
                errCode: 1,
                message: "You're not allowed to do that!",
            });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndUserAuthorization,
    verifyTokenAndAdmin,
};