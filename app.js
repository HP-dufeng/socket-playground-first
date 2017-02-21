var io = require('socket.io').listen(4000);

console.log('start:');

io.sockets.on('connection', function(socket){
    socket.on('join', function(data){
        socket.broadcast.emit('userJoined', data);
        socket.username = data.username;

        console.log('join: '+ socket.username);
    });

    socket.on('pingd', function(data, done){
        socket.broadcast.emit('pingd', {username: socket.username});
        done('ack');
    });

    socket.on('disconnect', function(){
        socket.broadcast.emit('userDisconnect', {username: socket.username});
    });
});
