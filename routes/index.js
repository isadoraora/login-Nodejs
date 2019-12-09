const routes = require('express').Router();
const { userService } = require('../controllers/user')
const { authentication } = require('../utils/auth')  

routes.post('/user/login', userService.login);
routes.get('/user/logout', userService.logout);
routes.post('/user/signup', userService.add);
routes.get('/user/find', authentication.checkJWT, userService.getInfo);


module.exports = routes;