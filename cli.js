#!/usr/bin/env node
const main = require('./ejs2static.js');

const argv = require('minimist')(process.argv.slice(2));

const validArgs = [
    'root',
    'ejsDir',
    'buildDir',
    'staticDir',
    'skipStatic',
];

Object.keys(argv).slice(1).forEach(arg => {
    switch (arg) {
        case "h": {
            displayHelp();
            process.exit();
            break;
        }
        case "help": {
            displayHelp();
            process.exit();
            break;
        }
        default: {
            if (!validArgs.includes(arg)) {
                console.error(`Unknown argument: ${arg}`);
                displayHelp();
                process.exit();
            }
        }

    }
});
main(argv);


function displayHelp() {
    console.log('Usage information can be found at: ' + require('./package.json').repository.url)
}
