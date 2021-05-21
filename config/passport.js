const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/users')
const bcrypt = require('bcryptjs');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'num'},(num,password,done)=> {
                //match user
                users.findOne({num : num})
                .then((user)=>{
                 if(!user) {
                     return done(null,false,{message : 'that Number is not registered'});
                 }
                 //match pass
                 bcrypt.compare(password,user.password,(err,isMatch)=>{
                     if(err) throw err;

                     if(isMatch) {
                         return done(null,user);
                     } else {
                         return done(null,false,{message : 'pass incorrect'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        users.findById(id, function(err, user) {
          done(err, user);
        });
      });  
}; 