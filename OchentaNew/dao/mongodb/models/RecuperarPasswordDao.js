const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class RecuperarPasswordDao extends DaoObject {
  constructor(db = null) {
    console.log('CategoryDao db: ', db);
    super(db, 'usuarios');
}

async setup() {
  if (process.env.MONGODB_SETUP) {
   // TODO: Agregar Indices
  }
}


updateOne({ email, password }) {
  const updateCommand = {
    "$set": {
      
      password,      
      updated: new Date().toISOString()
    }
  }
  return super.updateOne(email, updateCommand);
}













}