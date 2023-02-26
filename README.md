# Musto Flix (Angular)

- A web-application for movie fans.

## OBJECTIVES

- Using Angular framework, build the client-side for [MovieApi](https://github.com/mustafa-sarshar/movie-api) based on its existing server-side code (REST API and database), with supporting documentation.

## VISIT THE WEBSITE [😎🔗](https://mustafa-sarshar.github.io/musto-flix-angular/#/welcome)

### SCREENSHOTS

<table width="100%" style="overflow:auto">
  <tr>
    <th width="16.6%" style="text-align:center;">Welcome Page</th>
    <th width="16.6%" style="text-align:center;">Registration</th>
    <th width="16.6%" style="text-align:center;">Login</th>
    <th width="16.6%" style="text-align:center;">Movie Cards</th>
    <th width="16.6%" style="text-align:center;">Movie Details</th>
    <th width="16.6%" style="text-align:center;">User Profile</th>
  </tr>
  <tr>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-1.png?raw=true"/></td>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-2.png?raw=true"/></td>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-3.png?raw=true"/></td>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-4.png?raw=true"/></td>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-5.png?raw=true"/></td>
    <td width="16.6%"><img src="https://github.com/mustafa-sarshar/musto-flix-angular/blob/main/docs/assets/img/musto-flix-angular-6.png?raw=true"/></td>
  </tr>
</table>

## THE 5 W’s

- Who — The users of the [Musto Flix](https://mustafa-sarshar.github.io/musto-flix-angular/welcome) movie app and codebase, including other developers and designers.
- What — A single-page, responsive movie app built with Angular, with routing and several interface views. The client-side developed will support the existing server-side [MovieApi](https://github.com/mustafa-sarshar/movie-api) by facilitating user requests and rendering the response from the server-side via a number of different interface views.
- When — Users will be able to use the app whenever they want to read information about different movies or update their user information.
- Where — The app will be hosted online. It is responsive and can therefore be used anywhere and on any device, giving all users an equal experience.
- Why — Movie enthusiasts like to be able to access information about different movies, directors, stars, and genres whenever they want. The app will demonstrate my Angular skills and my ability to create straightforward documentation for other developers and employers.

## USER STORIES

- As a user, I want to be able to receive information on movies, directors, stars, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## KEY FEATURES

- The app should display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed.
- The single movie view will contain the following additional features:
  - A button that when clicked display the user details about the director of that particular movie will be displayed.
  - A button that when clicked display the user details about that particular star of the movie will be displayed.
  - A button that when clicked display the user details about that particular genre of the movie will be displayed.
  - A feature that enables the user to add or remove the movie from the favorites list.

## TECHNICAL REQUIREMENTS

- The application must be written in Angular (version 9 or later)
- The application requires the latest version of Node.js and npm package
- The application must contain user registration and login forms
- The application must be designed using Angular Material
- The application's codebase must contain comments using Typedoc
- The project must contain technical documentation using JSDoc
- The project must be hosted on GitHub Pages

## TECHNOLOGIES USED

- Angular +15
- Angular Material Design

## DEVELOPMENT SERVER

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## CODE SCAFFOLDING

- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## BUILD

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## RUNNING UNIT TESTS

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## RUNNING END-TO-END TESTS

- Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## FURTHER HELP

- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
