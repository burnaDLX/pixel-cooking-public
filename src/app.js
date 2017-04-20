'use strict';

// ------------------------------
// Set variables for environment
// ------------------------------
const express = require('express');
const path = require('path');
const spdy = require('spdy');
const cors = require('cors');
const pug = require('pug');
const async = require('async');
const logger = require('morgan'); // Express logger
const favicon = require('serve-favicon');
// mail
const nodemailer = require("nodemailer");
const wellknown = require('nodemailer-wellknown');
const tls = require('tls');
const svgCaptcha = require('svg-captcha');

// compression for gzip
// READ MORE ABOUT HERE
// >> https://github.com/expressjs/compression

const compression = require('compression');

const portnrHTTP = 80;
const portnrHTTPS = 443;
// read certificates and ssl
const fs = require('fs');
const http = require('http');
const https = require('https');

// uncomment on deploy

/*var ca = []
var chain = fs.readFileSync('../../../usr/ssl-certificate/pixel.cooking_ssl_certificate_INTERMEDIATE.crt', 'utf8');

chain = chain.split("\n");

var cert = [];

for (var i = 0, len = chain.length; i < len; i++) {
  var line = chain[i];
  if (!(line.length !== 0)) {
    continue;
  }
  cert.push(line);
  if (line.match(/-END CERTIFICATE-/)) {
    ca.push(cert.join("\n"));
    cert = [];
  }
}*/

var privateKey  = fs.readFileSync('ssl-certificate/www.pixel.cooking_private_key.key', 'utf8');
var certificate = fs.readFileSync('ssl-certificate/www.pixel.cooking_ssl_certificate.crt', 'utf8');

// var privateKey  = fs.readFileSync('../../../usr/ssl-certificate/www.pixel.cooking_private_key.key', 'utf8');
// var certificate = fs.readFileSync('../../../usr/ssl-certificate/www.pixel.cooking_ssl_certificate.crt', 'utf8');

var credentials = {
    // ca: ca,
    key: privateKey, 
    cert: certificate
};



const app = express();


// ------------------------------
// Configuration & Settings
// ------------------------------

// SSL/TLS
const httpServer = http.createServer(app);
// set https v2 protocol for response header
// spdy serves as fallback classic https v1
const httpsServer = spdy.createServer(credentials, app);


// PUG SETTINGS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = false;
// views as directory for all template files

// handle tasks with the async module
// read Step 1: https://engineering.gosquared.com/making-dashboard-faster
function parallel(middlewares) {
    return function(req, res, next) {
        async.each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(parallel([

    // Displays server log in the CLI
    logger('dev'),

    // Server Favicon
    favicon(__dirname + '/public/images/favicon.ico'),

    // compression middleware - compress all responses
    compression(),

    // instruct express to SERVE STATIC FILES
    express.static(path.join(__dirname, 'public'))//,

    // uncomment on deploy
    /* // FORCE SSL - redirect http traffic to https
    function(req, res, next) {
        var hostname = req.headers.host.split(":")[0];

        // 
        if (!req.secure && hostname != "pgp.pixel.cooking")
            return res.redirect(['https://', req.get('Host'), req.url].join(''));

        next();
    }*/
]));









// MAIL-CONFIG
var config = wellknown('1und1');

var smtpTransport = nodemailer.createTransport({
    service: "1und1",
    auth: {
        user: "application@pixel.cooking",
        pass: "ThisIsntTheUsedPW;-)"
    },
    tls: { rejectUnauthorized: false },
    debug: false
});


// SET ROUTES

app.get('/', function(req, res) {

    var hostname = req.headers.host.split(":")[0];

    if (hostname == "pgp.pixel.cooking")
        res.render('pgp');
    else
        res.render('main', { title: 'Cooking Frontends since 2015' });

});

app.get('/index.html', function(req, res) {
    res.redirect('/');
});

app.get('/about-me.html', function(req, res) {
    res.render('about-me', { title: 'About Me', url: 'about-me', level: 2 });
});


app.get('/work.html', function(req, res) {
    res.render('work', { title: 'Work', url: 'work', level: 2 });
});

app.get('/contact.html', function(req, res) {
    res.render('contact', { title: 'Contact', url: 'contact', level: 2 });
});


// ------------------------------
// Project Subpage
// ------------------------------

// 3rd parameter for phone slider image path
app.get('/projects/pgp-bird/index.html', function(req, res) {
    res.render('pgp-bird', { title: 'PGP-Bird', url: 'pgp-bird', level: 3, path: 'pgp-bird' });
});


// Serve downloads on about-us page
app.get('/documents/:filename', function(req, res) {

    var filename = req.params.filename;
    var vitaFilePath = "/documents/" + filename;

    fs.readFile(__dirname + vitaFilePath, function(err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});


// Captcha Handler (CORS ENABLED)
app.get('/captcha', cors(), function(req, res, next) {
    var captcha = svgCaptcha.create({
        noise: 3,
        size: 5
    });
    res.status(200).send(captcha);
    res.end();
})

// Mail Contact Form Handler (CORS ENABLED)
app.get('/send', cors(), function(req, res, next) {

    var mailOptions = {
        from: req.query.mail,
        to: "application@pixel.cooking",
        subject: "Bewerbungsformular",
        text: req.query.content
    }

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {

            res.end("error");
        } else {

            res.end("sent");
        }
    });

});




// ------------------------------
// Error handlers
// ------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            error: err,
            message: err.message,
            status: err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




// ------------------------------
//  Run Server
// ------------------------------

// Set server port
httpServer.listen(portnrHTTP, function() {
    console.log("HTTP Express Server listening on Port 80");
});
httpsServer.listen(portnrHTTPS, function() {
    console.log("HTTPS Express Server listening on Port 443");
});
