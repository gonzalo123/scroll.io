var key = "secret";
function getDocHeight() {
    var D = document;
    return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}
var socket = io.connect('http://localhost:8080');
var y = 0;

socket.emit('setKey', key);
socket.on('scrollTo', function (data) {
    if (data.y == 'max') {
        y = getDocHeight();
    } else {
        if (data.action == 'ffd') {
            y += parseInt(data.y);
        } else if (data.action == 'go') {
            y = parseInt(data.y);
        } else {
            y -= parseInt(data.y);
        }
    }
    window.scrollTo(0, y);

});
document.write('<img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://192.168.2.3:8000/panel/' + key + '&choe=UTF-8" alt=""/>');