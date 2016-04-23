var express = require('express');
var app =  express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Initialize appication with route / (that means root of the application)
// app.get('/', function(req, res){
//  var express=require('express');
//  app.use(express.static(path.join(__dirname)));
//  res.sendFile(path.join(__dirname, '', 'index.html'));
// });

app.use(express.static('./'));

var userSockets = [""];

// Register events on socket connection
io.on('connection', function(socket){
userSockets.push(socket);
//console.log(socket);
socket.on('chatMessage', function(from, msg){
  io.emit('chatMessage', from, msg);
});
socket.on('notifyUser', function(user){
    console.log(user)
  io.emit('notifyUser', user);
});

socket.on('caroPlay', function(posX,posY){
    console.log('caroPlay: ',posX,' ',posY);
    io.emit('caroPlay',posX,posY);
})
 userSockets.push(socket);
 //console.log(socket);
 socket.on('chatMessage', function(from, msg){
   io.emit('chatMessage', from, msg);
 });
 socket.on('notifyUser', function(user){
 	console.log(user)
   io.emit('notifyUser', user);
 });

 socket.on('caroPlay', function(posX,posY){
 	console.log('caroPlay: ',posX,' ',posY);
	io.emit('caroPlay',posX,posY);
 })

});

// Listen application request on port 3000
var port = 8124;
http.listen(port, function(){
console.log('listening on *: ', port);
});