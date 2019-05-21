# NxAngularResume

This project was created for showing Pasin style coding.

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

## Project Example

[Pasin Sukjaimitr resume site. (live-chat)](https://resume.maipas.in)

## Connecting to firebase

Add firebase-env.ts file to folder environments in both root app project and resume/dashboard lib (Cause dashboard lib need to get value for initializing firebase module and I have no solutions for injecting environment to dashboard module but that can inject to components and services)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](http://www.protractortest.org/).
