#!/usr/bin/env node

/*
* buildme.js will build the project
*
* You must have node installed.
*
 */
import fs from 'fs';
import shelljs from 'shelljs';

if (!shelljs.which('ejs')) {
    shelljs.echo('Sorry, this script requires ejs');
    shelljs.exit(1);
}

let targets = {
    "html/index.html" : "html/index.ejs",
    "html/index.ejs" : [
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

// foreach ejs target older than any of its dependencies, regenerate it with ejs

console.log("Hello World!");
