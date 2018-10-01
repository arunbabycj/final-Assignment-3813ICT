module.exports = function(app, io, fs){
    console.log("Server socket Initialised");

  //respond to connection request
    io.on('connection',(socket) => {
        console.log('user connection');
    //respond to disconnect request
        socket.on('disconnect',function(){
          console.log('user disconnection');
        });
    //respond to getting a new message
        socket.on('add-message',(message) => {
      //Broadcast the message to all other users that are subscribed to this socket.
          io.emit('message',{type: 'message', text:message});
        });
        socket.on('join', function(data){
      //joining
            socket.join(data.room);
            console.log(data.user + 'joined the room : ' + data.room);
            socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
        });

        socket.on('leave', function(data){
            console.log(data.user + 'left the room : ' + data.room);
            socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
          //  io.in(data.room).emit('left room', {user:data.user, message:'has left this room.'});
            socket.leave(data.room);
        });

        socket.on('message',function(data){
            io.in(data.room).emit('new message', {user:data.user, message:data.message});
        })
    });
};
