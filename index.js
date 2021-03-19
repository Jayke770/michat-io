
const express = require('express'); 
const app = express(); 
const http = require('http').createServer(app); 
const io = require('socket.io')(http);
const users = []; 

//assets
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});
//websocket
/*open connection*/
io.on('connection', (socket) =>{
    console.log("User Connected " + socket.id);
    console.log(users);
    /*user diconnect*/
    socket.on('disconnect', () =>{
        for(var i = 0; i < users.length; i++){
           if(users[i].id == socket.id){
               users.splice(i);
               console.log(users);
           }
        }
    });
    //add user 
    socket.on('add_user',  (name, callback) => {
        if(name != ''){
            users.push({id: socket.id, name: name});
            console.log(users);
            callback({
                id: socket.id, 
                name: name,
                status: true
            });
            socket.broadcast.emit('new_user', {id: socket.id, name: name});
        }
    });

    //chat user 
    socket.on('chat', (data_chat, resp) => {
        //get name
        var name;
        for(var i = 0; i < users.length; i++){
            if(data_chat.id == users[i].id){
                name = users[i].name;
                break;
            }
        }
        resp ({
            name: name,
            msg: 'Hi ' +name
        });
        socket.to(data_chat.id).emit('message', {name: data_chat.name, from: socket.id, msg: 'Hi '+name });
    });
    //myid 
    socket.on("my_id", (resp) => {
        resp ({
            id: socket.id
        });
    });
    //sent message 
    socket.on('sent message', (msg) => {
        //get name
        var name;
        for(var i = 0; i < users.length; i++){
            if(socket.id == users[i].id){
                name = users[i].name;
                break;
            }
        }
        var data = {
            name: name, 
            from: socket.id, 
            msg: msg.msg
        };
        socket.to(msg.chat_to).emit('message', data);
    });

    //typing 
    socket.on('typing', (data) => {
        socket.to(data.to).emit('chatmate_typing', {typing: true});
    });

    //on add username 
    socket.on('username', (username, resp) => {
        var usr = username;
        if(users.length != 0){
            for(var i = 0; i < users.length; i++){
                if(users[i].name == usr){
                    resp ({
                        isvalid: false
                    });
                }
                else {
                    resp ({
                        isvalid: true
                    });
                }
            }
        }
        else {
            resp ({
                isvalid: true
            });
        }
    });
});

const server = http.listen(process.env.PORT || 3000, () =>{
    console.log("Listening on " + server.address().address, server.address().port);
});