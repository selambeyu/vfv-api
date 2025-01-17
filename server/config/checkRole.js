const expressJwt = require('express-jwt');
const config=require('./config');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt( {secret:config.secret} ),

        // authorize based on user role
        (req, res, next) => {

            // console.log("DDD-", req.user.rawHeader);
            if (!roles.includes(req.user.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}