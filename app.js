
/**
 * Module dependencies.
 */

var express = require('express');
var jade = require('jade');
var stylus = require('stylus');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname,
    dest: __dirname + '/public',
    debug: true,
    compress: false
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Try Jade & Stylus'
  });
});

app.post('/jade2html', function(req, res){
  res.send(jade.render(req.rawBody));
});

app.post('/stylus2css', function(req, res){
  stylus.render(req.rawBody, {}, function(err, css){
    if (err) {
      res.send('ERROR');
    } else {
      res.send(css);
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
