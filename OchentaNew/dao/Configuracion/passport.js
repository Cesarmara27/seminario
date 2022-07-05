// const passport = require('passport');
// const modeloUsuario=require('../modelos/modeloUsuarioCliente');
// const estrategiaJWT=require ('passport-jwt').Strategy;
// const extraerJWT=require ( 'passport-jwt').ExtractJwt;
// const JWT =require('jsonwebtoken');
// const moment=require( 'moment');
// const duracion = moment.duration(15,"m").asSeconds();
// const clave="Tilin";
// exports.getToken =(data)=>{
//     return JWT.sign(data,clave,{expiresIn: duracion});
// };
// const opciones={};
// opciones.jwtFromRequest=extraerJWT.fromAuthHeaderAsBearerToken();
// opciones.secretOrKey=clave;

// passport.use(new estrategiaJWT(opciones, async (paylad, done)=>{
// return await modeloUsuario.findOne({

//     where:{
//         idUsuario:paylad.idUsuario,
//         estado:'AC',
//     }
// })
// .then((data) =>{
    
//     return done(null,data.idUsuario);
    
// })
// .catch((error)=>{ 
//     return done(null,false);
    
// }); 
// }));
// exports.validarAuntenticado = passport.authenticate('jwt',{session:false,
//     failureRedirect:'/api/autentificacion/error'}); 