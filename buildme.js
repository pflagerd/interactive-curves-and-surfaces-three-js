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



console.log("Hello World!");
