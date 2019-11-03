
const { spawn } = require('child_process');
const options = {
    slient:true,
    detached:true,
    stdio: [null, null, null, 'ipc']
};

child = spawn('node', ['tail.js', `${ __dirname}/files/notes.md`], options);

process.on('exit', function(code) {
    child.kill();
    return console.log(`About to exit with code ${code}`);
});

process.on('SIGINT', function() {
    process.exit();
});

const ipc = require("node-ipc");
ipc.config.id = "observer";
ipc.config.silent = true;

ipc.serve(() => {
    ipc.server.on("connect", () => {
        console.log("server got connect");
    });

    ipc.server.on("message", (data) => {
        console.log(data);
    });
});

ipc.server.start();
