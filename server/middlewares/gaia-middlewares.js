const jwt = require('jsonwebtoken');
const supersecret = process.env.SUPERSECRET || 'weirdpassword2'

class GaiaMiddlewares {
    static verifyAdmToken (req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            console.log('erro verify');
            return next({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, supersecret, (err, decodedToken) => {
            if (err) {
                console.log('erro verify', err);
                return next({ auth: false, message: 'Error' });
            }

            req.id = decodedToken.id;

            return next();
        });
    }
}

module.exports = GaiaMiddlewares;