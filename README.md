# ☁︎ RECOH portal

## 🌟 Features

- Write SCSS and modern JavaScript code in `src` and build minified, transpiled code for production in `dist`
- Continuous integration with linting tests and deploying to `gh-pages`
- Live reloading with webpack-dev-server
- ES6+ to ES5 transpilation, bundling, and minification
- SCSS to CSS transpilation, bundling, autoprefixing, and minification
- Automatic copying of HTML and static assets from `src` to `dist` folders
- Linting for styles and scripts

## 🎛 Usage

- Write all your ES2015+ Javascript code in `src/js` and SCSS styling in `src/style`. Store static assets in `src/static`.
- Organize HTML files the way you like.
- Available commands:
    - `npm run build`: Build files to the `dist` folder. Transpile down to ES5 and bundles all JS into `app.bundle.js`. Transpile SCSS to CSS and adds prefixing into `style.bundle.css`. Copies static assets and HTML over, and bundled CSS and JS gets added to HTML file.
    - `npm run start`: Run `webpack-dev-server` at `localhost:3000`. Includes live reloading on any Javascript/SCSS/HTML changes.
    - `npm run start:prod`: Builds files and runs a local production server on `localhost:8080` with `http-server`.
    - `npm run run lint:js`: Lints JS with ESLint.
    - `npm run lint:styles`: Lints SCSS stylesheets with stylelint.
    - `npm run lint:html`: Lints HTML for a11y issues using pa11y.

## Maintenance
Use `npx npm-check-updates -u --packageFile package.json` to update all packages.
