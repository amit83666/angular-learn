var app = require('express')();
var http = require('http').Server(app);
const { log } = require('console');
var path = require('path');
var io = require('socket.io')(http);


app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    }
    var fileName = 'index.html';
    res.sendFile(fileName, options);
})

var users = 0;
var cnsp = io.of('/custom-namespace');
cnsp.on('connection', function(socket){
    console.log('A user is connected');
    cnsp.emit('customEvent', 'Tester event call');
    // users++;
    // socket.emit('newuserconnect', { message:' Hii, Welcome Dear'})
    // socket.broadcast.emit('newuserconnect', { message: users + 'Users connected'})
    // global broadcast
    // io.sockets.emit('broadcast',{ message: users + 'users connected'})

    // socket.on('myCustumEventFromClientSide',function(data){
    //     console.log(data);
    // });

    // setTimeout(function(){
    //     // socket.send('send message from server side by prereserved events');
    //     // create custom event whicj is prereserved and work on both client side and server side
    //     socket.emit('myCustumEvent', {description: 'A custom message from server side!'});
    // },3000);
    socket.on('disconnect', function(){
        console.log('A user id disconnected');
        
    // users--;
    // io.sockets.emit('broadcast',{ message: users + 'users connected'})
    // socket.broadcast.emit('newuserconnect', { message: users + 'Users connected'})
    })

});

http.listen(3000, function(){
    console.log('server read on 3000')
})