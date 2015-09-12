var io = require('socket.io').listen(8080);
io.set('origins', '*:*');

var app = require("express")();
app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-requested-with ");
  next();
});

app.set('view options', {
    layout:false
});

app.get('/panel/:key', function (req, res) {
    var key = req.params.key;
    console.log(key);
    res.render('mobile.jade', {key:key});
});

app.get('/action/:key/:y/:action', function (req, res) {
    var key = req.params.key;
    var y = req.params.y;
    var action = req.params.action;
    sockets[key].emit('scrollTo', {y:y, action:action});
    res.send('OK');
});

app.listen(8000);

var sockets = {};
io.sockets.on('connection', function (socket) {
    socket.on('setKey', function (key) {
        sockets[key] = socket;
    });
});