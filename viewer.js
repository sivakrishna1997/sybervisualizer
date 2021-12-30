const routes = require('express').Router();
const path = require('path');
const { getFilesFromFolder, getFolders } = require('./src/getUploads');
const { getUsersData } = require('./src/user');
const directoryPath = path.join(__dirname, 'public', 'uploads');


routes.get('/', async (req, res, next) => {
    res.render('login');
});
routes.get('/home', async (req, res, next) => {
    res.render('home');
});

routes.get('/upload', async (req, res, next) => {
    res.render('upload');
});

routes.get('/dashboard', async (req, res, next) => {
    res.render('dashboard');
});

routes.get('/visualization', async (req, res, next) => {
    res.render('visualization');
});


module.exports = routes;