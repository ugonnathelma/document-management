[![Build Status](https://travis-ci.org/andela-uofoegbu/document-management.svg?branch=develop)](https://travis-ci.org/andela-uofoegbu/document-management.svg?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/andela-uofoegbu/invertindex/badge.svg?branch=develop)](https://coveralls.io/github/andela-uofoegbu/document-management?branch=develop)

## document-management
Document Management System is a react redux application that allows users to create, track, manage and store documents.

## Technologies and Services

### Written in Javascript es6 syntax and nodejs on the backend, with the following:

* Mocha
* Webpack
* React Redux
* Travic CI
* Coveralls
* Hound CI
* HTML/CSS
* Sequelize
* Express


## Contributions

* Clone the repository.
* Install dependencies
* Create a new branch for included feature(s) using the keyword feature/ example feature/new-feature.
* Raise a pull request.

## Application Features
###### User Authentication
Users are authenticated and validated using JWT tokens. 

###### Document Management
*   Create an account
*   Login with your credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created by his access group with access level set as `role`.
*   Search a users public documents.
*   View `public` and `role` access level documents of other regular users.
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents except documents with access set to private.
    -   Delete any user.
    -   Update any user's record.
    -   Create a new role.
    -   View all created roles.
    -   Search for any user.

## Installation
-   Install NodeJs and Postgres on your machine
-   Clone the repository `$ git clone https://github.com/andela-uofoegbu/document-management.git`
-   Change into the directory `$ cd /DocManagement`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory

## Usage
-   Migrate your database by running this command `sequelize  db:migrate:all`
-   Seed your database by running this command `npm run db:seed:all`, this seeds admin and regular roles, and superadmin user.
-   Run `npm run start:dev` to start the application on development environment

## Testing
-   Run Test `npm test`
-   You can undo your migrations by running this command `npm run db:migrate:test:undo`.

` I strongly suggest using separate DB for testing and development `

## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
#### API Features

The following features make up the Document Management System API:

###### Authentication
-   It uses JSON Web Token (JWT) for authentication.  

-   It generates a token on successful login or account creation and returns it to the consumer.  

-   It verifies the token to ensures a user is authenticated to access protected endpoints.

###### Users

-   It allows users to be created.  

-   It allows users to login and obtain a token  

-   It allows the admin to manage users.

###### Roles

-   It ensures roles can be created, retrieved, updated and deleted by an admin user.
-   A non-admin user cannot create, retrieve, modify, or delete roles.  
-   it allows for assignment of roles to users

###### Documents

-   It allows new documents to be created by authenticated users.  

-   It ensures all documents are accessible based on the permission specified.  

-   It allows admin users to create, retrieve, modify, and delete documents.


-   It ensures users can delete, edit and update documents that they own.  

-   It allows users to retrieve all documents they own as well as public documents.

###### Search

-   It allows users to search public documents and documents they own for a specified search term.

-   It allows admin to retrieve all documents that matches search term.

-   It allows admin to search users based on a specified search term

#### Available API Endpoints and their Functionality

EndPoint                         |   Functionality
---------------------------------|------------------------
POST /api/v1/users/login         |   Logs a user in.
POST /api/v1/users               |   Creates a new user.
GET /api/v1/users                |   Find matching instances of user.
GET /api/v1/users/:id            |   Find user.
PUT /api/v1/users/:id            |   Update user attributes.
DELETE /api/v1/users/:id         |   Delete user.
POST /api/v1/documents           |   Creates a new document instance.
GET /api/v1/documents            |   Find matching instances of document.
GET /api/v1/documents/:id        |   Find document.
PUT /api/v1/documents/:id        |   Update document attributes.
DELETE /api/v1/documents/:id     |   Delete document.
GET /api/v1/users/:id/documents  |   Find all documents belonging to the user.
GET /api/v1/search/users/        |   Gets all users with username contain the search term
GET /api/v1/search/documents/    |   Get all documents with title containing the search query
GET /api/v1/roles                |   Get all roles
POST /api/v1/roles               |   Creates a new role
DELETE /api/v1/roles/:id         |   Deletes role
GET /api/v1/roles/:id            |   Find role
GET /api/v1/tokenHealth          |   Check token validity

