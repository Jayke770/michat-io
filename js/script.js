var socket = io(); 
var myid = '';
var my_name = '';
var chatmateid = '';
var chatmate_name = ''; 
var r_div = '<div class="receive"><div class="receive_chat">Hi</div></div>',
    s_div = '<div class="sent"><div class="sent_chat">Hello</div></div>'
$(".chat").submit(function(e){
    e.preventDefault(); 
    var msg = $(".msg"); 
    var data = {
        chat_to: chatmateid, 
        msg: msg.val()
    };
    if(msg.val() == ''){
        m = '<i class="fa fa-heart fa-lg red"></i>';
    }
    else{
        m = msg.val();
    }
    $('.chats').append('<div class="sent"><div class="sent_chat">'+m+'</div></div>');
    socket.emit('sent message', data);
    scroll();
    msg.val("");
});
socket.on('message', function(msg){
    var data = JSON.stringify(msg);
    var msgs = JSON.parse(data);
    if(myid != msg.from){
        chatmateid = msg.from;
        chatmate_name = msg.name;
        if(msg.msg == ''){
            m = '<i class="fa fa-heart fa-lg red"></i>';
        }
        else{
            m = msg.msg;
        }
        $(".mi_box").slideDown(200);
        $(".rm").slideUp(200);
        $('.chats').append('<div class="receive"><div class="receive_chat">'+m+'</div></div>');
        $(".ctnm").text(msg.name);
        scroll();
    }
});

//welcome
$(".data").submit(function(e){
    e.preventDefault(); 
    var usr = $(".usr").val(); 
    if(usr != ''){
        socket.emit('username', usr, (resp) => {
            if(resp.isvalid){
                $(".usr").val("");
                socket.emit('add_user', usr, (id) =>{
                    if(id.status == true){
                        myid =  id.id;
                        my_name = id.name;
                        $(".data").fadeOut();
                        $(".rm").fadeIn(500);
                    }
                }); 
                
            }
            else {
                alert("Username is already taken!");
            }
        });
    }
});
$(".rooms").delegate(".chat", "click", function(){
    var id = $(this).attr("data-id"); 
    chatmateid = id;
    $(this).attr("chat", "true");
    socket.emit("chat", {id: id, name: my_name}, (resp) =>{
        $('.ctnm').text(resp.name)
        $(".mi_box").slideDown(200);
        $(".rm").slideUp(200);
        $('.chats').append('<div class="sent"><div class="sent_chat">'+resp.msg+'</div></div>');
    });
});
//get myid 
socket.emit("my_id", (id) => {
    myid = id.id;
});
//is chatmate is typing 
socket.on('chatmate_typing', (status) =>{
    const tw = new Typewriter(".ctnm", {
		loop: true,
	});
    if(status.typing == true){
        tw.typeString('. . .')
        .pauseFor(100)
        .deleteAll()
        .changeCursor('#')
	    .typeString('Typing')
        .start();
    }
    else {
        tw.typeString(chatmate_name)
        .pauseFor(300)
        .changeCursor('+')
        .start();
    }
});
//new user 
socket.on('new_user', (data) => {
    if(data.id != myid){
        var randomColor = Math.floor(Math.random()*16777215 + 1 + 1).toString(16);
        $('.rooms').append('<button style="background-color:#'+randomColor+';" class="mi_btn chat" type="button" data-id='+data.id+'><span class="fa fa-user"></span> '+data.name+'</button>');
    }
});
$(".msg").on('keyup keydown', function(){
    if($(this).val().length < 1){
        var data_typing = {
            to: chatmateid,  
            typing: true
        };
        socket.emit('typing', data_typing, (status));
    }
    else{
        var data_typing = {
            to: chatmateid,  
            typing: false
        };
        socket.emit('typing', data_typing, (status));
    }
});
function scroll() {
    setTimeout(function(){
        var obj = $(".main_chats");
        var h = obj.get(0).scrollHeight;
        obj.animate({scrollTop: h}, 1000);
    }, 100);
}