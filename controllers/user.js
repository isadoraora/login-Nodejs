require('dotenv').config();
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const bcryptjs = require('bcryptjs');
const { returnService } = require('../utils/return');

const userService = {
  login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    user.findOne({ email: email })
      .then(data => {
        if(data){
          const usuarioRetorno = data ? data.toObject() : null;
          if (usuarioRetorno && bcryptjs.compareSync(senha, usuarioRetorno.senha)) {
            // eslint-disable-next-line no-underscore-dangle
            const token = jwt.sign({ user: usuarioRetorno._id }, process.env.SECRET, {
              expiresIn: 1800,
            });
            data.token = token;
            data.ultimo_login = new Date().toISOString();
            data.save();
            returnService.sender(res,200,true,null,null, data);
          } else {
            returnService.sendError(res,401,'Usuário e/ou senha inválidos',null);
          }
        }else{
          returnService.sendError(res,404,'Usuário e/ou senha inválidos',null);
        }
      }).catch(erro => {
        returnService.sendError(res,400,'Falha ao realizar login',erro);
      });
  },

  logout(req, res) {
    returnService.sender(res,200,true,null,null,{ success: true, auth: false, token: null });
  },

  getInfo(req, res) {
    if(req.userId){
      user.findById(req.query.id)   
        .then(data => {
          if(data){
            returnService.sender(res,200,false,null,null,data);
          }else{
            returnService.sendError(res,404,'Usuário não encontrado',null);
          }
        }).catch(() => {
          returnService.sendError(res,400,'Falha ao buscar usuário',null);
        });

    }
    
  },
  
  add(req, res) {
    var newUser = new user();
    newUser.nome = req.body.nome;
    newUser.email = req.body.email;
    newUser.senha = req.body.senha;
    newUser.telefones = req.body.telefones;
    newUser.data_criacao = new Date().toISOString();
    newUser.data_atualizacao = '';
    newUser.ultimo_login = '';
    newUser.token = '';

    user.findOne({ email: req.body.email })
      .then((data) => {
        if(data){
          returnService.sendError(res,400,'Email já cadastrado',null);
        }else{
          newUser.senha = bcrypt.hashSync(req.body.senha, 10);
          newUser.save()
            .then(x => { 
              console.log(x);
              returnService.sender(res,200,true,'','Usuario cadastrado com sucesso', newUser);
            }).catch(() => {
              returnService.sendError(res,400,'Falha ao cadastrar o usuario',null);
            });
        }
      })
  },
};

module.exports = {
  userService,
}