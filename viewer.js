const routes = require('express').Router();
const path = require('path');
const { getFilesFromFolder } = require('./src/getUploads');
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
    const files = await getFilesFromFolder({ directoryPath });
    res.render('dashboard', { files });
});
routes.get('/visualization', async (req, res, next) => {
    const files = await getFilesFromFolder({ directoryPath });
    res.render('visualization', { files });
});


module.exports = routes;