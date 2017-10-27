# PolicyMgmtUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.
Install angular cli through node.

`npm install -g @angular/cli`

Open cmd from your desired folder and execute  the below command:

`ng new policy-mgmt-ui --style scss`

This will create an Angular 2 project named policy-mgmt-ui


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Or type `ng serve --open` which will directly open the app in your default browser.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploying in Pivotal Cloud Foundry

Run the below commands from `policy-mgmt-ui` directory one after the other
`ng build`
`cd dist`
`cf push  -b staticfile_buildpack policy-mgmt-ui`
Check if everything is working fine by opening the url of policy-mgmt-ui app deployed in pcf.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
"# policy_mgmt" 
