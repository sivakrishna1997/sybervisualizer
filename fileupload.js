const express = require('express');
const {saveFiles} = require('./src/getUploads')
const routes = express.Router();

routes.use('/savefiles', saveFiles);

module.exports = routes;