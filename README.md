# Parsons Problems System built on Grails

An app based on Luke Felsberg's UF Senior Project, with functionality implemented on Grails' react-app profile and REST controllers.

## Capabilities and Current Development Stage

Currently, this project provides the ability to create and solve Parsons Problems (https://en.wikipedia.org/wiki/Parsons_problem). Basically, these are drag-and-drop code problems intended for introductory programming course administration.

This project runs entirely locally right now, and development focused on getting familiar with Grails as a full-stack framework. It is currently set up to interact with a local mySQL database for persistent problem/solution storage.


## Implementation Background

The creation of this project relied on Grails, which you can install yourself with instructions here -- https://docs.grails.org/latest/guide/gettingStarted.html.
I specifically used a version of Grails 5, which allows for easy creation of apps with a React profile -- https://grails-profiles.github.io/react/latest/guide/index.html. Additional information can be found here -- https://guides.grails.org/using-the-react-profile/guide/index.html.


Very basically, the profile generates two applications `server` and `client`. `server` is built with the Grails `rest-api` profile (including support for creating domain resrouces, restful controllers, and JSON views). `client` is your basic React front-end, with configured for easy communication with Grails back-end via REST.


## Local Installation and Running

First, you'll need Node.js to run the website locally (https://nodejs.org/en/download/).

In the `client` directory (your React app), run--
```bash
npm install
```
You may run into dependency errors, but this resource https://github.com/grails/grails-forge-ui suggests adding `—legacy-peer-deps` to avoid these.

And, currently, you'll need to manually install react-router-dom--
```bash
npm install react-router-dom —save
```


Grails projects rely on Gradle tasks for running applications, so to start both applications run--
```bash
./gradlew server:bootRun
```
```bash
./gradlew client:bootRun
```
in your `server` and `client` directories, respectively.


Finally, you'll also need mySQL installed to utilize the database connection, as specified in *application.yml*. In that file, you'll also need to include the username and password to access your mySQL instance. Installation and further instructions can be found here -- https://dev.mysql.com/doc/mysql-getting-started/en/.