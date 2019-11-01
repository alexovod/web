
    // const path = require("path");

    // console.log(`The filename is ${path.basename(__filename)}`);
    
    
    // console.log(process.pid);
    // console.log(process.versions.node);
    
    // console.log(process.argv);
    
    
    // const [,,firstName, lastName] = process.argv;
    
    // console.log(`You name is ${firstName} ${lastName}`);
    



//flags

const path = require("path");
const exec = require("child_process").exec;

var cmd = "ls";
const flags = "-l";


exec(`${cmd} ${flags}`, function(error, stdout, stderr) {
    if (error)
        console.log(`${stderr}`);
    else 
    {
        console.log(`${stdout}`);
    }
  });

//   const grab = flag => {
//     let indexAfterFlag = process.argv.indexOf(flag) + 1;
//     return process.argv[indexAfterFlag];
// }

// const greeting = grab("--greeting");
// const user = grab("--user");

// console.log(`${greeting} ${user}`);