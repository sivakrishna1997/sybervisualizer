const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('./src/mongoose')();
const expressfileupload = require('express-fileupload');
const engine = require('ejs-locals');
var app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(expressfileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
}));

app.use('*', cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));

app.use('/api',require('./fileupload'));
app.use('/api', require('./routes'));
app.use('/', require('./viewer'));

const port = process.env.PORT || 8080;
app.listen(port);
console.log("your port number:" + port);
