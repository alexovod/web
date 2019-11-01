const fs = require("fs");

// fs.readdir("./", (err, files) => {
//     if(err) throw err;

//     console.log(files);
// });

// console.log("reading files....");


const md  = `

This is dummi text:

* ---- One

* ---- Two

* ---- Three

`;

const handleError = err => { 
    if(err) throw err;
}

if (fs.existsSync("files"))
{
    console.log("Dir exists");
    
    fs.appendFile('./files/notes.md', md, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    // fs.writeFile("./files/notes.md", md.trim(), err => {
    //     handleError(err);
    
    //     console.log("File saved");
    // });

} else 
{
    console.log("Making new dir");
    fs.mkdir("files", err => {
        handleError(err);
        console.log("Directory created");
    
        fs.writeFile("./files/notes.md", md.trim(), err => {
            handleError(err);
        
            console.log("File saved");
        });
    })
    
    
}

