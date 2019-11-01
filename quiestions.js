// process.stdout.write("Hello ");
// process.stdout.write(" World \n\n\n");


//2 ,3
const path = require("path");

const quiestions = [
    "What is your name?",
    "What would you rather be doing?",
    "What is your preferred programming language?"
];

const ask = (i=0) => {
    process.stdout.write(`\n\n\n ${quiestions[i]}`);
    process.stdout.write(` > `);
}

ask();

const answers = [];



process.stdin.on("data", data => {
    answers.push(data.toString().trim());

    if(answers.length < quiestions.length)
    {
        ask(answers.length);
    } else 
    {
        process.exit();
    }
});

process.on("exit", () => {
    const [name, activity, lang] = answers;
    console.log(`
        Thank you for answers!

        Go ${activity} ${name}, you can write ${lang} code later.
    
    `);
});