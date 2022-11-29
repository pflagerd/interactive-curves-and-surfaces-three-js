Do 7 TBD Types of Parametric Functions: 1D Polynomial Functions in XYZ Form.



PROBLEMS:

- [ ] The y position of drawKatex() seems to render at 1/2 the expected rate.  I.e. A '0' at (1, 1) looks more like an '0' at (1, 0.5).  Doubling the y value passed in gives about the right answer.

- [ ] The [**html-webpack-plugin**](https://github.com/jantimon/html-webpack-plugin) usage works, but seems kind of weird, because I'm importing `katex/dist/katex.css` in `index.js`, which just seems off.  I feel more like I'd like to have `katex/dist/katex.css` as part of a `<link>` tag in the `index.html`.  Making a template `index.html` would probably be the easiest answer.

- [ ] Also, I don't understand why `unproject()` worked.  Maybe it really didn't, but I've only fooled myself into thinking it did.

- [ ] `project()` gave projects with NaN and Infinity in it.

   

