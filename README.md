# Logo Jigsaw

Simple drag'n'drop game with branded logo puzzle.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with TypeScrpt template.

Basic packages used during development:

* React 16.12
* React Router DOM 16.9
* Typescript 3.7.2
* History 4.10.1
* [Material ui](https://material-ui.com/) for design (with Material UI icons)

No 3rd party package to handle drag and drop functionality.

Packages used for testing:

* Jest (via Testing Library)
* Enzyme 3.10.4 - support for testing hooks
* [jest-localstorage-mock](https://www.npmjs.com/package/jest-localstorage-mock) 2.4.0 - support for mocking localstorage
* Cypress 3.8.3 for visual testing

Technical solution:

* Stateless functional components with hooks
* User name stored in localstorage
* Strict TypeScript approach

## Requirments

* Node LTS Carbon (12.14.0) installed
* Yarn 1.21.1 installed

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eslint`

Runs Eslint check for .tsx and .ts files.

#### `cypress:open`

Open Cypress in the visual mode (Please run `yarn start` before running this script - Cypress need to see running site).

#### `cypress:test`

Runs Cypress tests in the console (Please run `yarn start` before running this script - Cypress need to see running site).
