const path = require("path");
const fse = require('fs-extra');
const ejs = require('ejs');

class Generator {
    constructor(options) {
        this.fileData = options.data || {};
        this.sourceDir = path.resolve(options.sourceDir);
        this.outputDir = path.resolve(options.outputDir);
        this.copyAll = !!options.copyAll;


        Object.keys(this.fileData).forEach(key => {
            this.fileData[path.resolve(path.join(this.sourceDir, key))] = this.fileData[key];
        });
    }

    async generate() {
        await fse.ensureDir(this.outputDir);
        console.log(`Clearing ${this.outputDir}...`);
        await fse.emptyDir(this.outputDir);
        await this.generateDirRecursive(this.sourceDir, this.outputDir);
    }
    getData(path) {
        return this.fileData[path] || {};
    }

    async generateFile(fromFilePath, toFile) {
        const basename = path.basename(fromFilePath);
        console.log(`Rendering ${basename}...`);
        const str = await ejs.renderFile(fromFilePath, this.getData(fromFilePath));
        const newFileName = toFile.replace(/\.ejs$/, ".html");
        await fse.createFile(newFileName);
        await fse.writeFile(newFileName, str);
        console.log(`Wrote ${basename} to ${newFileName}`);
    }

    async generateDirRecursive(fromFolder, toFolder) {
        const promises = [];
        const filesNDirs = await fse.readdir(fromFolder, {withFileTypes: true});
        filesNDirs.forEach(fileOrDir => {
            if (fileOrDir.isDirectory()) {
                promises.push(this.generateDirRecursive(path.join(fromFolder, fileOrDir.name), path.join(toFolder, fileOrDir.name)));
            } else {
                if (fileOrDir.name.match(/\.ejs$/)) {
                    promises.push(this.generateFile(path.join(fromFolder, fileOrDir.name), path.join(toFolder, fileOrDir.name)));
                } else {
                    if (this.copyAll) {
                        promises.push(fse.copy(path.join(fromFolder, fileOrDir.name), path.join(toFolder, fileOrDir.name)));
                    }
                }
            }
        });
        await Promise.all(promises);
    }
}

module.exports = Generator;
