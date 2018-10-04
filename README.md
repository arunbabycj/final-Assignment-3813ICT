
<<<<<<< HEAD
# Assignment
=======
# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run-script unitTest` to execute the unit tests. This will make server to test all the routes and print out on screen the test status. This unittest uses mocha for thi spurpose and codess are structured in  mocha in the following way. assert is a standard module that provides easy-to-use assertion functions. 

describe creates a suite of test cases, and it implements a test case. The first argument to it is an explanation of the test case, and the second parameter is the test case function to which Mocha passes a done object. done should be called whenever the test case is finished. Inside the test case function, you should implement your test


## Git Repository Structure

This Assignment Git repository named "Assignment"  is structured into 

1. Server side
2. Cient side

Server side runs with **nodemon server.js** and client side runs with **ng build**..
All the codes were backed up stage by stage to ensure good version control and to save any problems during changeovers.  CLient side runs with Angular js Type script and uses components to display data on the front end. On the back-end we will use Node.js with express and Socket.IO. Reasoning behind this is that Socket.IO is very easy to set up and work with. Furthermore, it provides both server and client side libraries. Socket.IO primarily uses WebSocket protocol to enable real-time bidirectional communication. After each succesful function operatins it is saved into Git for succesful version control with suitable commit names. 

## Client and Server Data Transfer

The transfer of data between clent and sever is done through JSON format, which collects data via http get() method and tra and data is saved back to server via http post() method. Reading file in Angular6 is done through the get method while Writing file is done via Post method.

## Data Structure

All data used for the purpose is saved in a Mongodb database. In this database we have two collections which are "Users and "groups".
This user collection conatins a username, password and groupname. 
The group collection contains groupnames only. At first a person registers and then he can login using username and password. After login they can select group which will be added to respective users collection under username and to the groups as well. On successful deletion the user can delete group from their profile. 

## Rest Api

Frontend will communicate with server running at port3000 using rest API. A constant Uri is generated in each of angullar components and whenever they use a get or post method this will send data to server with respective Api useing a service at angular side
(issue.service.ts). Below are the routes used at server side. 

app.post('/issues/add', (req, res) => {
  This route is trigerred whenever a person registers with a username and passord. this is then added to the user collection group at Mongodb.
}

app.get('/users/check/:data', (req, res) => {
  This route checks the username and password which is transfereed as data againstthe ones in database and resoponds true if it is matching and responds false if not matching. This is used for authentication. 
}

app.post('/groups/add', (req, res) => {
  This route add a group to the group collection and to the respective username who has logged in. It checks if agroup is present with that name and if present will respond false alrting person to select a different name else responds true alreting success. 
 }
 
 app.post('/groups/delete', (req, res) => {
  This deletes group from the respective username and keeps it alive in the group if incase they want to join back again
  }
 
 app.get('/groups/:user', (req, res) => {
  This route find the groups which the user can chat or they have been added to. this responds with json data which canthen be displayed    on angular screen.
  }
  
  app.get('/groups/:user', (req, res) => {
    This returns all the groups in groups collection which is then filtered at the angular end fro the ones which user has been added into so it gets displayed with different buttons which are "add" and "delete".
  
## Angular front end

a. package.json: Instructs the Node.js package manager (npm) on what it needs to do; including which dependency packages should be installed.

b. node_modues: Directory where npm will install packages.

c. config.js: Contains the application–specific configuration option

**app.js:** Defines the main application module (app). Configures:

a. That the application will be run by Express

b. Which routes there will be & where they are located in the file system (routes directory)

c. What middleware to use (e.g. to parse the JSON received in requests)

d. Error handler for queries sent to an undefined route


## Angular architecture

The different components used are Chat, Create, Edit and List. Chat component is used with the help of sockets for chatting on screen. Create component creates a user and password. List component allows user to login and then it will be transfered to Edit component for creating groups. Issue.service.ts is the service used for get and post methods whicg gets connected to the server side. Also socket.servce.ts is used for communocating to srver from socket side. 


