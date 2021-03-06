const JwtStartegy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const keys =require('./keys')
const User=require('../models/User')

const opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey=keys.secretOrkey
module.exports=passport=>{
    passport.use(new JwtStartegy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id)
        .then(user=>{
            if(user)
            {
                return done(null,user)
            }
            return done(null,false)
        })
        .catch(err=>console.log(err))
    }))
}