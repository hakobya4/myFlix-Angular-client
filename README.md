#FaveFlix

FaveFlix is an app where users can register and log in, and find a list of movies that they can add to their favorites list. Users can see the summary, director, and genre information of each movie. Users can also change their user information, and once done the user can either log out or delete their user.

## Objective
To use Angular, and build the client-side for an application called FaveFlix based on
its existing server-side code (REST API and database), with supporting
documentation.

## Table of Contents
- [Features](#Features)
- [Screenshots](#Screenshots)
- [Technical_Requirements](#Technical_Requirements)
- [Dependencies](#Dependencies)
- [Environment](#Environment)
- [User_Stories](#User_Stories)

## Features
- This app displays a welcome view where users are able to either log in or register an
account.
- Once authenticated, the user can view all movies.
- Each movie in the movie has:
  - A button that when clicked takes a user to the director view, where details about the director of that particular movie will be displayed.
  - A button that when clicked takes a user to the genre view, where details about that
a particular genre of the movie will be displayed.
  - A button that when clicked adds the specific movie to a user's favorites list.
- A user can access a profile view where they can view/ change their account information and view the list of their favorite movies.
- A user can log out or delete their user information, which stops them from accessing the profile view or the movie view.

## Screenshots

<img src ="https://github.com/hakobya4/myFlix-Angular-client/assets/108638724/db4689c3-26c2-4af4-8aea-7d1030bcc2ff" width="400" height="250"/>
<img src ="https://github.com/hakobya4/myFlix-Angular-client/assets/108638724/9324a74d-bb0e-4c84-ba4f-ec71c1dc02bb" width="400" height="250"/>
<img src ="https://github.com/hakobya4/myFlix-Angular-client/assets/108638724/d9ffc8e7-54e5-4605-b41c-1e1ff768e6ed" width="400" height="250"/>
<img src ="https://github.com/hakobya4/myFlix-Angular-client/assets/108638724/dd749ba5-c84b-44e4-a553-fe70d6499f3e" width="400" height="250"/>

## Technical_Requirements
- The app is written in Angular (version 9 or later)
- The app runs on the latest version of Node.js and npm package
- The app contains user registration and login forms
- The app is designed using Angular Material
- The app's codebase contains comments using Typedoc
- The project contains technical documentation using JSDoc
- The project is hosted on GitHub Pages

## Dependencies
To install the dependencies for this app run npm install after forking the code.
- Angular CLI
- TypeScript

## Environment
- Angular: run "ng new myFlix-Angular-client" to create a new angular app.
- Run your app using "npm run start" to run the app on the local server
- Push the app to a GitHub repository, create a branch gh-pages using "git checkout -b gh-pages"
- Access the hosted app on the pages tab in the settings

## User_Stories

FEATURE 1: Movie View

As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.

SCENARIO 1: 

Given user has logged in; When the user moves to the movies view; Then the user should see a list of all movies on the app.

SCENARIO 2:

Given the movies view is open; When a user clicks on the Synopsis button; Then the user should receive a dialogue that contains a summary of the movie

SCENARIO 3:

Given the movies view is open; When a user clicks on the Genre button; Then the user should receive a dialogue that contains info on the genre of the movie

SCENARIO 4:

Given the movies view is open; When a user clicks on the Director button; Then the user should receive a dialogue that contains info on the director of the movie

FEATURE 2: Profile View.

As a user, I want to be able to create a profile so I can save data about my favorite movies.

SCENARIO 1

Given the welcome view is open; When the user has not interacted with the details of the event; Then the welcome view is shown allowing the user to login or signup

SCENARIO 2

Given the welcome view is open; When the user clicks on signup; Then the user can input information to signup for an account.

SCENARIO 3

Given the welcome view is open and user has signed up; When the user clicks on login; Then the user can input information to login and which will show the movies view.

SCENARIO 4

Given the user has logged in and is in the movies view; When the user clicks on profile view; Then the user can view their profile information and their favorite movie list.
