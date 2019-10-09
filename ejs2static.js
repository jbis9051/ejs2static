const path = require("path");
const fse = require('fs-extra');
const ejs = require('ejs');

module.exports = (options) => {
    options = options || {};

    if (!options.ejsDir && !options.root) {
        options.root = process.cwd()
    }
    if(options.ejsDir && !options.buildDir){
        throw new Error("'buildDir' required")
    }
    if(options.root){
        options.ejsDir = path.join(options.root,'views');
        if(!options.buildDir){
            options.buildDir = path.join(options.root,'gen');
        }
        if(!options.skipStatic){
            options.staticDir = path.join(options.root,'public');
        }
    }
    options.ejsDir = path.resolve(options.ejsDir);
    options.buildDir = path.resolve(options.buildDir);
    if(options.staticDir){
        options.staticDir = path.resolve(options.staticDir);
    }
    return generate(options.ejsDir, options.buildDir, options.staticDir).catch(err => {
        throw new Error(err);
    }).then(_ => {
        console.log("Static site generation complete!");
        console.log("Exported to: " + options.buildDir);
    });
};

async function generate(ejsDir,buildDir, staticDir) {
    await fse.ensureDir(buildDir);
    await fse.emptyDir(buildDir);
    const promises = [];
    if (staticDir && await fse.exists(staticDir)) {
        promises.push(fse.copy(staticDir, buildDir));
    }
    promises.push(generateDirRecursive(ejsDir, buildDir));
    await Promise.all(promises);
}

async function generateFile(fromFilePath, toDirectory) {
    const str = await ejs.renderFile(fromFilePath);
    const newFileName = path.basename(fromFilePath).replace(".ejs", ".html");
    await fse.createFile(path.join(toDirectory, newFileName));
    await fse.writeFile(path.join(toDirectory, newFileName), str)
}

async function generateDirRecursive(fromFolder, toFolder) {
    const promises = [];
    const filesNDirs = await fse.readdir(fromFolder, {withFileTypes: true});
    filesNDirs.forEach(fileOrDir => {
        if (fileOrDir.isDirectory()) {
            promises.push(generateDirRecursive(path.join(fromFolder, fileOrDir.name), path.join(toFolder, fileOrDir.name)));
        } else {
            if (fileOrDir.name.match(/\.ejs$/)) {
                promises.push(generateFile(path.join(fromFolder, fileOrDir.name), toFolder));
            }
        }
    });
    await Promise.all(promises);
}
