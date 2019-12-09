var uuid = require('uuid/v1');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const telefones =  new Schema({ 
  numero: { type: Number, required: true },
  ddd: { type: Number, required: true },
},{ _id: false });

const usuarios =  new Schema({
  _id: { type: String, default: uuid },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  telefones: [telefones],
  data_criacao:{ type: String, required: true },
  data_atualizacao:{ type: String },
  ultimo_login:{ type: String },
  token:{ type: String },
},{ _id: false });

var user = mongoose.model('user', usuarios);


module.exports = {
  user,
}