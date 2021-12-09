const express = require('express');
const user = require('./src/user');
const routes = express.Router();
// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })

routes.use('/user/add', user.adduser);
routes.use('/user/login', user.login);
routes.use('/user/getall', user.getusers);
routes.use('/user/delete', user.deleteuser);


module.exports = routes;