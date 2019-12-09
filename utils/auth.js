const jwt = require('jsonwebtoken');

const authentication = {
  checkJWT(req, res, next) {
    var token = req.headers['bearer'];
    if (!token) return res.status(401).send({ mensagem: 'Não autorizado' });
        
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).send({ mensagem: 'Não autorizado' });
            
      req.userId = decoded.user;
      next();
    });
  },
}

module.exports = {
  authentication,
}