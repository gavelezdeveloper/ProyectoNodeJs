'use strict'
const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token, 'i03CmmfaZuUtQySa2grjtACfKpoB4iJo1RW4LAcM9hRsIfbiGzjh8JbgOvOJWdfqrUoyJiBCcRhy6GCrgPZO0xLwf8Xbwh0S9OLp4H0JgnjrgZqoEOwVF23a0wr5rqbXeWHmZkhAJ9ceWOiRenyoda3WvICQ2Mt08mU54SFNob0qAwbv1CUsGIvNRbsMv6mSuCyycyErggjlhhktYiepC4J8VKvkKzHeDILAmsmL8Vrt8Jx4jbJ5d6YPhevdIwoz', (err, decoded) => {
                if(err){
                    return res.status(403).json({message: "Token invalida."});
                }else{
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{
                        if(err) return req.status(500).send({message: "Error al devolver los datos."});
                        if(!session) return res.status(404).send({message:"Los datos de autenticación no son validos."});
                        
                        next();

                    });
                }
            });

        }else{
            res.status(403).send({
                message: "Token no valida."
            });
        }
    }
};
module.exports = middlewares;