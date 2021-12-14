var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { shouldSendSameSiteNone } = require('should-send-same-site-none');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

var app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://me-musicplayer.netlify.app", "https://trunkeymusicplayer.herokuapp.com"],}));
app.use(cookieParser());
app.use(shouldSendSameSiteNone);


const db = require('./configs/db/index');
db.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res , next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methos', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    next();
})
app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
