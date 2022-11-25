# Interactive Curves and Surfaces Reboot (A three.js tutorial on CAGD).

This project is about learning CAGD (Computer Aided Geometric Design) by writing [Javascript](https://en.wikipedia.org/wiki/JavaScript) code.  Here you will learn how to create web applications similar to those described in a [SigGraph](https://en.wikipedia.org/wiki/SIGGRAPH) 1998 paper called [Introduction to Curves and Surfaces (Rockwell, Chambers et al)](doc/intro_to_curves.pdf). That paper inspired a book called [Interactive Curves and Surfaces (A multimedia tutorial on CAGD)](https://www.amazon.com/Interactive-Curves-Surfaces-Multimedia-Tutorial/dp/1558604057) by the same authors.

This edition of the Interactive Curves and Surfaces Reboot uses the amazing [WEBGL](https://en.wikipedia.org/wiki/WebGL)-based 3D framework for javascript called [three.js](https://threejs.org/).  Any application you write using three.js will work on any OS using any major browser (Firefox, Chrome, Edge, Safari, etc.)

Even though it is available here in the `doc/` directory, you do not need to read the [SigGraph paper](doc/intro_to_curves.pdf) because its concepts have been rebooted herein as Markdown files in the `md/` directory.  

To grok this project's content, you should read the lessons in `md/`, in alphabetic order, sub-directory by sub-directory, file by file.

For example, start reading <a href="md/ 1 Introduction to CAGD/ 1 In this topic, you will learn.md">`md/ 1 Introduction to CAGD/ 1 In this topic, you will learn.md`</a>



### What are all these directories and files for?

Consult the file .readme.md for descriptions of each file/directory in this project.

Directories often have their own README.md and TODO.md.  Consult these for details on what's going on in that directory.

One important thing you should know is that the directory `template/`   provides a simple webpack-based web client development toolchain for three.js. It is intended to be copied to a different (new) directory and modified.  

`template/` has its own README.md (and TODO.md) which you should consult for details about how to perform this particular webpack-based development workflow using the toolchain provided.  For example, README.md will tell you how to build, debug and deploy a program starting from `template/`.



