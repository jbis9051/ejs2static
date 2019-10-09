#!/usr/bin/env node
const main = require('./ejs2static.js');


if(process.argv.length < 3){
    main();
    return;
}

const argv = require('minimist')(process.argv.slice(2));

const validArgs = [
    'root',
    'ejsDir',
    'buildDir',
    'staticDir',
    'skipStatic',
];

Object.keys(argv).slice(1).forEach(arg => {
    if(arg === "h"){
        displayHelp();
        process.exit();
    } else if(!validArgs.includes(arg)){
       console.error(`Unknown argument: ${arg}`);
       displayHelp();
       process.exit();
    }
});

main(argv);


function displayHelp() {
    console.log('Usage information can be found at: ' + require('./package.json').repository.url)
}
