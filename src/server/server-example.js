var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/pages/index.html');
});

io.on('connection', function(socket){
  socket.on('game1', function(msg){
    if (msg.everyone) {
      io.emit('game1', msg);
    } else {
      socket.broadcast.emit('game1', msg);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
