const Generator = require('../ejs2static');

const gen = new Generator({
    sourceDir: './ejs',
    outputDir: './dist',
    copyAll: true,
    data: {
        './dir/dirtest.ejs': {
            someData: "testing data"
        }
    },
    empty: false,
});

gen.generate().then(_ => console.log("Done!"));
