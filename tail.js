const Tail = require('tail').Tail;
const ipc = require("node-ipc");

const args = process.argv.slice(2);
var filePath;
if(args[0]) {
    filePath = args[0];
    console.log(`has arg: ${args[0]}`);
} else {
    console.log(`has no args`);
    process.exit();
}

var connected = false;
ipc.config.id = "brodcaster";
ipc.config.silent = true;


function handleConnection(data) {
    ipc.of.observer.on("connect", function() {
        console.log("broadcaster connected to observer");
        connected = true;
        ipc.of.observer.emit("message", data);        
    });
}

function handleDisconnect() {
    ipc.of.observer.on("disconnect", function(){
        if (connected) {
            console.log("broadcaster disconnected from observer");
            connected = false;
        }
    });    
}

tail = new Tail(filePath);
tail.on("line", function(data) {
    console.log(data);
    if(connected) {
        ipc.of.observer.emit("message", data);
    } else {
        ipc.connectTo("observer", function(){           
            handleConnection(data);
            handleDisconnect();
        });
    }
});
 
tail.on("error", function(error) {
  console.log('ERROR: ', error);
});

