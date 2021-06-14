# Protips for testing

Install react-testing-library, in addition to Jest.
```sh
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Run tests in non-watch mode with:
```sh
CI=true npm test
```

Find test coverage:
```sh
CI=true npm test -- --coverage
```

## End-to-end testing

For testing the system through the same interface as real users use.

- [Selenium](https://www.selenium.dev/)
- [Headless browser](https://en.wikipedia.org/wiki/Headless_browser)
- [Cypress](https://www.cypress.io/)

## Cypress

- [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell)
- [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes)

Install to the frontend (can be in frontend, backend, or separate repository):
```sh
npm i -D cypress
```

Add an npm-script to run it:
```JSON
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 db.json",
    "cypress:open": "cypress open", // <-- run GUI
    "test:e2e": "cypress run"  // <-- run CLI, saves a video to /cypress/videos
  },
}

```
Add npm-script to the backend to start it in test mode:
```JSON
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
    "logs:prod": "heroku logs --tail",
    "lint": "eslint .",
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
    "start:test": "cross-env NODE_ENV=test node index.js" // <--
  },
  // ...
}
```

When **both backend and frontend** are running, start Cypress with the command
```sh
npm run cypress:open
```
to open the GUI.

Files in `/cypress/integration/examples` can be deleted.

Get rid of eslint error by installing `eslint-plugin-cypress` as a development dependency:
```sh
npm install eslint-plugin-cypress --save-dev
```

then change the configuration in `.eslintrc.js` to include it
```js
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "cypress/globals": true // <--
  },
  "extends": [ 
    // ...
  ],
  "parserOptions": {
    // ...
  },
  "plugins": [
    "react", "jest", "cypress" // <--
  ],
  "rules": {
    // ...
  }
}
```