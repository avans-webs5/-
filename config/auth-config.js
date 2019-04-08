var mongoose = require('mongoose');
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

User = mongoose.model('User');
var secrets = require("./secret");
var LocalStrategy = require('passport-local').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

    
    function createJWTToken(user){
                
        var payload = { id: user._id, email: user.email };
        var token = jwt.sign(payload, secrets.JWTsecret, { expiresIn: '24h'});
        return token;
    }

    //__________________ (de)serializer  __________________

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (userId, done) {
        User.findById(userId)
            .then((user) => done(null, user))
            .catch((err) => done(err, false));
    });

    //__________________ JWT  __________________

    
    var cookieExtractor = function (req) {
        var token = null;
        if (req && req.cookies) token = req.cookies['token'];
        return token;
    };

    var localStrategyOptions = {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    };

    passport.use('login', new LocalStrategy(localStrategyOptions, function (req, email, password, done) {
        
        User.findOne({ email: email }).then(user => { 
            if (user && user.password === password) {
                user = user.toObject();

                delete user.password;
                user.token = createJWTToken(user);
                
                done(null, user);
            } else {
                done(null, false);
            }
        });
        
    }));


    var jwtStrategyOptions = {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
        secretOrKey: secrets.JWTsecret
    };

    passport.use('jwt', new JwtStrategy(jwtStrategyOptions, function(jwt_payload, next) {
        User.findOne({ email: jwt_payload.email }).then(user => { 
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
      }));


      var facebookOptions = {
        clientID: secrets.facebookAuth.clientID,
        clientSecret: secrets.facebookAuth.clientSecret,
        callbackURL: secrets.facebookAuth.callbackURL,
        profileURL: secrets.facebookAuth.profileURL,
        profileFields: secrets.facebookAuth.profileFields,
        passReqToCallback: true
    };

    passport.use(new FacebookStrategy(facebookOptions, function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ $or: [{ 'facebookId': profile.id }, { 'email': profile.emails[0].value }] }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        User.findOne()
                        .sort("-_id")
                        .collation({locale: "en_US", numericOrdering: true})
                        .exec(function (err, u) {   
                            var newUser = new User();
                            newUser._id = parseInt(u._id)+1;
                            newUser.firstName = profile.name.givenName;
                            newUser.lastName = profile.name.familyName;
                            newUser.email = profile.emails[0].value;
                            newUser.roles = ["user"];
                            
                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                newUser.token = createJWTToken(newUser);
                                return done(null, newUser);
                            });
                        });
                    }
                });
            } else {
                return done(null, req.user);
            }
        });
      }
    ));

    var googleOptions = {
        clientID: secrets.googleAuth.clientID,
        clientSecret: secrets.googleAuth.clientSecret,
        callbackURL: secrets.googleAuth.callbackURL,
        passReqToCallback: true
    };

    passport.use(new GoogleStrategy(googleOptions, function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ $or: [{ 'googleId': profile.id }, { 'email': profile.emails[0].value }] }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        } else {
                            User.findOne()
                            .sort("-_id")
                            .collation({locale: "en_US", numericOrdering: true})
                            .exec(function (err, u) {   
                                var newUser = new User();
                                newUser._id = parseInt(u._id)+1;
                                newUser.firstName = profile.name.givenName;
                                newUser.lastName = profile.name.familyName;
                                newUser.email = profile.emails[0].value;
                                newUser.roles = ["user"];
                                
                                newUser.save(function (err) {
                                    if (err) {
                                        return done(err);
                                    }
                                    newUser.token = createJWTToken(newUser);
                                    return done(null, newUser);
                                });
                            });
                        }
                    });
                } else {
                    return done(null, req.user);
                }
            });
          }
    ));
      

}