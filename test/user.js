var supertest = require('supertest')
var should = require('should')


var server = supertest.agent('localhost:3000')

describe("Testes de usuário", function(){

  

  describe("Testes de login", function(){

    it("Tentativa de login válida", function(done){
      server
        .post("/user/login")
        .send({ "email": "andrey@hotmail.com","senha": "souandrey" })
        .expect(200) 
        .end(function(err,res){
          res.status.should.equal(200)
          res.body.email.should.equal('andrey@hotmail.com')
          res.body.should.have.property('token')
          if (err) return done(err)
          done();
        })
    })

    it("Tentativa de login com email inexistente", function(done){
      server
        .post("/user/login")
        .send({ "email": "meuemailquenaoexiste@hotmail.com","senha": "minhasenhaerrada" })
        .expect(404) 
        .end(function(err,res){
          res.status.should.equal(404)
          res.body.mensagem.should.equal("Usuário e/ou senha inválidos")
          res.body.should.not.have.property('token')
          if (err) return done(err)
          done();
        })
    })

    it("Tentativa de login com senha incorreta", function(done){
      server
        .post("/user/login")
        .send({ "email": "andrey@hotmail.com","senha": "minhasenhaerrada" })
        .expect(401) 
        .end(function(err,res){
          res.status.should.equal(401)
          res.body.mensagem.should.equal("Usuário e/ou senha inválidos")
          res.body.should.not.have.property('token')
          if (err) return done(err)
          done();
        })
    })

    it("Chamada de URL incorreta no login", function(done){
      server
        .post("/usuario/login")
        .send({ "email": "meuemail@hotmail.com","senha": "minhasenha2" })
        .expect(404)
        .end(function(err,res){
          res.status.should.equal(404)
          if (err) return done(err)
          done();
        }) 
    })
  })

  describe("Testes de informações de usuários", function(){

    it("Tentativa válida de obtenção de dados de usuário", function(done){

      server
        .post("/user/login")
        .send({ "email": "andrey@hotmail.com","senha": "souandrey" })
        .end(function(errTk,resTk){
          server
            .get("/user/find?id=5bcb9970-5228-11e9-a7e0-b7b00ad9a776")
            .set({"Bearer": resTk.body.token})
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200)
              res.body.should.have.property("nome")
              res.body.should.have.property("email")
              res.body.should.have.property("_id")
              if (err) return done(err)
              done()
            })
        })
            
    })

    it("Tentativa inváliida de obtenção de dados de usuário", function(done){
      server
        .post("/user/login")
        .set({"Bearer": "esteNaoeUmTokenValido"})
        .expect(404)
        .end(function(err,res){
          res.status.should.equal(404)
          res.body.should.not.have.property("nome")
          res.body.should.not.have.property("email")
          res.body.should.not.have.property("_id")
          res.body.mensagem.should.equal("Usuário e/ou senha inválidos")
          if (err) return done(err)
          done()
        })
    })
  })
})