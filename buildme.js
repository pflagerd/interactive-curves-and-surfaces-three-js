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

let dependencies = {
    file: "html/index.ejs", dependsOn: [ "html/css/base.css",
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


console.log("Hello World!");
