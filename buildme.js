#!/usr/bin/env node

/*
* buildme.js will build the project
*
* You must have node installed.
*
 */
import ejs from 'ejs';
import fs from 'fs';
import shelljs from 'shelljs';

function file(filename) {
    try {
        const stats = fs.statSync(filename)

        // console.log(`File Data Last Modified: ${stats.mtime}`)
        // console.log(`File Status Last Modified: ${stats.ctime}`)
        return { lastModified: stats.mtime};
    } catch (error) {
        return { lastModified: new Date().setTime(0) }
    }
}



if (!shelljs.which('ejs')) {
    shelljs.echo('Sorry, this script requires ejs');
    shelljs.exit(1);
}

let targets = {
    // "html/index.html" : ["html/index.ejs"],
    // "html/index.ejs" : [
    //     "html/css/base.css",
    //     "html/css/vendor.css",
    //     "html/css/main.css",
    //     "html/js/modernizr.js",
    //     "html/js/jquery-3.2.1.min.js",
    //     "html/js/plugins.js",
    //     "html/js/main.js",
    //     "html/index.sidebar.ejs",
    //     "html/index.footer.ejs",
    //     "images/thumbs/masonry/woodcraft-600.jpg" ],

    "html/index.html" : [
        "html/index.ejs",
        "html/css/base.css",
        "html/css/vendor.css",
        "html/css/main.css",
        "html/js/modernizr.js",
        "html/js/jquery-3.2.1.min.js",
        "html/js/plugins.js",
        "html/js/main.js",
        "html/index.sidebar.ejs",
        "html/index.footer.ejs",
        "images/thumbs/masonry/woodcraft-600.jpg" ],

}

let domain = "temporary.domain";
let revision = "temporary.revision";

// if any dependency of target younger than target, regenerate target with ejs
if (targets["html/index.html"].some((filename) => { return file("html/index.html").lastModified < file(filename).lastModified }))
    ejs.renderFile("html/index.ejs", { domain: domain, revision: revision}, {}, (err, str) => {
        if (err !== null) {
            console.log("Unable to render");
            console.log(err)
        } else {
            console.log("Hi");
            fs.writeFileSync("html/index.html", str);
        }
    });
// thus: ejs ./thing.ejs -f data_file.json -o ./thing.html
