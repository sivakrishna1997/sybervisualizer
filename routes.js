const express = require('express');
const user = require('./src/user');
const uploads = require('./src/getUploads');
const routes = express.Router();
// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })

routes.use('/user/add', user.adduser);
routes.use('/user/login', user.login);
routes.use('/user/getall', user.getusers);
routes.use('/user/delete', user.deleteuser);
routes.use('/user/addfolder', user.addFolder);
routes.use('/user/removefolder', user.removeFolder);

//uploads

routes.use('/createFolder', uploads.createFolder)
routes.use('/getfiles', uploads.getFiles)
routes.use('/getfolders', uploads.getFoldersList)
routes.use('/deletefile', uploads.deleteFile)
routes.use('/getfilesfromfolders', uploads.getFilesFromFolders)


module.exports = routes;