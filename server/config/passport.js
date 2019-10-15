// const JwtStrategy=require('passport-jwt').Strategy;
// const ExtractJWT=require('passport-jwt').ExtractJwt;
// const User=require('../models/users');
// // const passport=require('passport')
// const Admin=require('../models/admin')
// const config=require('../config/config');

// module.exports=(userType,passport)=>{
//     let opts={};
//     opts.jwtFromRequest=ExtractJWT.fromAuthHeaderWithScheme("jwt");
//     opts.secretOrKey=config.secret;
//     passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
//         if(userType=='admin'){
//             Admin.getAdminById(jwt_payload.data._id,(err,user)=>{
//                 if(err)return done(err,false);
//                 if(user)return done(null,user);
//                 return done(null,false);
//             });
//         }
//         if(userType=='users'){
//             User.getUserById(jwt_payload.data._id,(err,user)=>{
//                 if(err)return done(err,false);
//                 if(user)return done(null,user);
//                 return done(null,false);
//             });
//         }
//     }))
// }