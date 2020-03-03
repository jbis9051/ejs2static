# ejs2static

*An extremely simple static site generator supporting ejs*

## Description 

This module will generate static sites from ejs files. This allows you to deploy your site on a static provider such as GitHub pages.

I created this because I couldn't find a super simple module or CLI app to do it. [Harp](https://github.com/sintaxi/harp) exists, but [apparently Node 12 isn't supported](https://github.com/sintaxi/harp/issues/648).

## Installation

Module

```shell script
npm install ejs2static --save
```

## Usage

```js
const Generator = require('ejs2static');

const generator = new Generator(options);

gen.generate() // returns a Promise that resolves once all files are generated
```


### `options`(optional)

- `sourceDir` - This directory will be searched recursively for files. EJS files will be rendered to HTML and copied to the `outputDur` retaining the directory structure.
- `outputDir` - Generates to the static site to this directory.**This directory will be cleared before generation if `empty` option is true!**
- `copyAll` (optional - default `false`) - If true, all non ejs files in the `sourceDir` will be copied to the `buildDir`. This is helpful for copying assets.
- `data` - (optional - default `{}`) - Object with keys of files relative to the `sourceDir` and values of an object that will be passed as data to the ejs render when the file specified in the key is rendered. (Huh? Check the examples).
- `empty` - (optional - default `false`) - If true, the outputDir will be cleared before render.


# Example

```text
├── dist
│   ├── components
│   │   └── head.html
│   ├── dir
│   │   └── dirtest.html
│   ├── test-file.txt
│   └── test.html
├── ejs
│   ├── components
│   │   └── head.ejs
│   ├── dir
│   │   └── dirtest.ejs
│   ├── test-file.txt
│   └── test.ejs
└── test.js

```


```js
// test.js
const Generator = require('../ejs2static');

const gen = new Generator({
    sourceDir: './ejs',
    outputDir: './dist',
    copyAll: true,
    data: {
        './dir/dirtest.ejs': {
            someData: "testing data"
        }
    }
});

gen.generate().then(_ => console.log("Done!"));

```

## License

MIT
