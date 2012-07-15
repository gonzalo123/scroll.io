var io = require('socket.io').listen(8080);

var app = require('express').createServer();
app.set('view engine', 'jade');

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