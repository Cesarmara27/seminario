

const nodemailer = require("nodemailer");
const expiresIn = parseInt(process.env.PIN_AGE_SECONDS) * 1000;
const DaoObject = require('../../dao/mongodb/DaoObject');

module.exports = class Usuario {
  usuarioDao = null;

  constructor(usuarioDao = null) {
    if (!(usuarioDao instanceof DaoObject)) {
      throw new Error('An Instance of DAO Object is Required');
    }
    this.usuarioDao = usuarioDao;
  }
  async init() {
    await this.usuarioDao.init();
    await this.usuarioDao.setup();
  }
  
  async updateUsuario({ 
    
    password,
    
    }) {
    const result = await this.usuarioDao.updateOne({
      
      password:pin});
    return {
     
      modified: result
    }
  }

  
}
const enviarCorreo=async()=>{

 
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "zarema5635@gmail.com", 
          pass:'duvnkgnajijangpk',
          
        },

      });

      try {
        await transporter.verify();
        console.log("Puede enviar correo");

      } catch (error) {
        console.log(error);
      }
      return transporter;
      


}

module.exports = enviarCorreo;