# ejs-to-static

*An extremely simple static site generator supporting ejs*

## Description 

This module/CLI app will generate static sites from ejs files. This allows you to deploy your site on a static provider such as GitHub pages.

I created this because I couldn't find a super simple module or CLI app to do it. [Harp](https://github.com/sintaxi/harp) exists, but [apparently Node 12 isn't supported](https://github.com/sintaxi/harp/issues/648).

##Installation

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

####Advanced usage:

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
const ejs2static = require('ejs2static');

ejs2static([options]); // returns a Promise that resolves once all files are generated
```


#### `options`(optional)

- `root: "/path/to/project"` - Uses the provided path as the root path of the project.
- `ejsDir: "/path/to/ejsFileDirectory"` - This directory will be searched recursively for `.ejs` files. These files will be rendered to HTML and copied to the `buildDir` retaining the directory structure.
- `buildDir: "/path/to/build/dir"` - Generates to the static site to this directory. Defaults to `[root]/gen` **This directory will be cleared before generation!**
- `staticDir: "/path/to/static/dir"` - Files from this directory are copied directly to the `buildDir`. Used for assets (images, etc.), and already static pages. Defaults to `[root]/static`. If the default path doesn't exist and a different one isn't provided nothing will be coppied.
- `skipStatic: true` - Used in conjunction with `--root` or with no arguments to skip the default static directory even if it exists

Rules:

- Use `root` OR `ejsDir`, not both. 

- If `ejsDir` is used `buildDir` is required


## License

MIT
