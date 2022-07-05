const enviarCorreo = require('../../../../libs/security/recuperarPassword')
const express = require('express');
let router = express.Router();
const Usuario = require('../../../../libs/usuarios');
const UsuarioDao = require('../../../../dao/mongodb/models/UsuarioDao');
const userDao = new UsuarioDao();
const user = new Usuario(userDao);
user.init();

const { jwtSign } = require('../../../../libs/security');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await user.getUsuarioByEmail({ email });
    if (!user.comparePasswords(password, userData.password)) {
      console.error('security login: ', { error: `Credenciales para usuario ${userData._id} ${userData.email} incorrectas.` });
      return res.status(403).json({ "error": "Credenciales no Válidas" });
    }
    const { password: passwordDb, created, updated, ...jwtUser } = userData;
    const jwtToken = await jwtSign({ jwtUser, generated: new Date().getTime() });
    return res.status(200).json({ token: jwtToken });
  } catch (ex) {
    console.error('security login: ', { ex });
    return res.status(500).json({ "error": "No es posible procesar la solicitud." });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email = '',
      password = ''
    } = req.body;
    if (/^\s*$/.test(email)) {
      return res.status(400).json({
        error: 'Se espera valor de correo'
      });
    }

    if (/^\s*$/.test(password)) {
      return res.status(400).json({
        error: 'Se espera valor de contraseña correcta'
      });
    }
    const newUsuario = await user.addUsuarios({
      email,
      nombre: 'John Doe',
      avatar: '',
      password,
      estado: 'ACT'
    });
    return res.status(200).json(newUsuario);
  } catch (ex) {
    console.error('security signIn: ', ex);
    return res.status(502).json({ error: 'Error al procesar solicitud' });
  }
});

router.post('/recuperarPass', async (req, res) => {
  try {

    const { email } = req.body;

    var pin = 0;

    function generateRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (1 + max - min) + min);
    }
    for (i = 0; i <= 500; i++) {
      pin = generateRandom(1000, 9000);
    }
    
    
    const userData = await user.getUsuarioByEmail({ email });
    console.log(userData);
    const transporter = await enviarCorreo();



    let info = await transporter.sendMail({
      from: 'zarema5635@gmail.com',
      to: userData.email,
      subject: "Seminario",
      text: '1234',
      html:

        '<h2 style="color: #e67e22; text-align: center; margin: 0 0 7px">Ochenta!</h2> <br> <p> Para poder actualizar su password, ingrese con este pin, solo durará 8 horas </p>  <br> Password temporal: ' + '<h1 >' + pin + '</h1>',

    });
    res.json({ mensaje: "Correo enviado" });


  } catch (ex) {
    console.error({ ex });
    return res.status(500).json({ "error": "No fue posible enviar el correo." });
  }
});
// router.put('/updatePass/:codigo', async (req, res) => {
//   try {
    
//     const { password } = req.body; if (/^\s*$/.test(email)) { return res.status(400).json({ error: 'Se espera valor de correo' }); }
//     if (/^\s*$/.test(password)) { return res.status(400).json({ error: 'Se espera valor de contraseña correcta' }); }
    

//     const updateResult = await user.updateUsuario({ password });

//     if (!updateResult) { return res.status(404).json({ error: 'Usuario no encontrada.' }); } return res.status(200).json({ updateUsuario: updateResult });

//   } catch (ex) {
//     console.error(ex);
//     res.status(500).json({ error: 'Error al procesar solicitud.' });
//   }
// });




module.exports = router;