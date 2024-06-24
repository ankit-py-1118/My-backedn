const JWT = require('jsonwebtoken');
const createError = require('http-errors');
module.exports = {
    signAccessToken: (payload) => {
        return new Promise((resolve, rej) => {
            const secret = process.env.ACCESS_TOKEN_KEY;
            const options = {
                expiresIn: "1y",
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                    console.error(err, "jwt token error")
                    rej(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());

        const authHeader = req.headers['authorization'];
        const bearerToken  = authHeader.split(' ');
        const token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }

            req.user = payload;
            next()
        })
    }, 
    signRefreshToken: (userId) => {
        return new Promise((resolve, rej) => {
            const payload = {
              
            }
            const secret = process.env.REFRESH_TOKEN_KEY;
            const options = {
                expiresIn: "1y",
                issuer: 'google.com',
                audience: userId
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                    console.error(err, "jwt token error")
                    rej(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, payload) => {
                if(err) return reject(createError.Unauthorized());
                const userId = payload.aud
                resolve(userId);
            })
        })
    }
}