# ejs2static

*An extremely simple static site generator supporting ejs*

## Description 

This module/CLI app will generate static sites from ejs files. This allows you to deploy your site on a static provider such as GitHub pages.

I created this because I couldn't find a super simple module or CLI app to do it. [Harp](https://github.com/sintaxi/harp) exists, but [apparently Node 12 isn't supported](https://github.com/sintaxi/harp/issues/648).

## Installation

CLI:

```shell script
npm install -g ejs2static
```

Module

```shell script
npm install ejs2static --save
```

## Usage

### CLI

#### Simple usage:
- ejs files must be in `./views`
- Site will be generated to `./gen`

```console
$ cd /path/to/project
$ ejs2static
Static site generation complete!
Exported to: /path/to/poject/gen
```

#### Advanced usage:

Arguments:

See [#Module Args](#optionsoptional) for descriptions and rules

- `--root="/path/to/project"` 
- `--ejsDir="/path/to/ejsFileDirectory"` 
- `--buildDir="/path/to/build/dir"`
- `--staticDir="/path/to/static/dir"`
- `--skipStatic` 


Example:

Using the current working directory as `--root` but skips static files
```console
$ ejs2static --skipStatic
Static site generation complete!
Exported to: /path/to/poject/gen
```

Using the current working directory as `--root` but skips static files
```console
$ ejs2static --root="/path/to/project"
Static site generation complete!
Exported to: /path/to/poject/gen
```

### Module

```js
const Generator = require('ejs2static');

const generator = new Generator(options);

gen.generate() // returns a Promise that resolves once all files are generated
```


#### `options`(optional)

- `sourceDir` - This directory will be searched recursively for files. EJS files will be rendered to HTML and copied to the `outputDur` retaining the directory structure.
- `outputDir` - Generates to the static site to this directory.**This directory will be cleared before generation!**
- `copyAll` (optional - default `false`) - If true, all non ejs files in the `sourceDir` will be copied to the `buildDir`. This is helpful for copying assets.
- `data` - (optional - default `{}`) - Object with keys of files relative to the `sourceDir` and values of an object that will be passed as data to the ejs render when the file specified in the key is rendered. (Huh? Checked the examples).


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
