const express = require('express');
const app = express();
const router = express.Router();
//const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
app.use(express.static(path.join(__dirname , '../dist/Assignment2/')));

// Cross origin resource sharing to cater for port 4200 to port 3000
// This is not required if running from ng build then client and server both run on port 3000
// See https://github.com/expressjs/cors for implementation example
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200', // Angular server address and port
  optionsSuccessStatus: 200 //
};

// Set up CORS (Cross Site)
app.use(cors(corsOptions));
app.use(bodyParser.json());
require('./listen.js')(http);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Assignment2';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    //db.dropDatabase();
    require('./create.js')(app, db);
    require('./read.js')(app, db);
    require('./add.js')(app, db);
    require('./update.js')(app, db);
    require('./socket.js')(app, io, fs);
    require('./remove.js')(app, db);


    db.collection("users").find({}).toArray(function(err, issues) {
      if (err)
          console.log(err);
      else
          console.log(issues);
    });

    db.collection("groups").find({}).toArray(function(err, issues) {
      if (err)
          console.log(err);
      else
          console.log(issues);
    });

    let uname = "";
    let pwd = "";
    app.get('/users/check/:data', (req, res) => {
      console.log("1",req.params.data);
      var user = req.params.data;
      db.collection("users").findOne({"username":user}, function(err, result) {
          if (err) throw err;
          console.log("2",result);
          var pass = result.password;
          console.log("3",pass);
          if (pwd == pass){
            res.send({"ok": true});
          }else{
            res.send({"ok": false});
          }
    });
  });

  app.get('/password/check/:data', (req, res) => {
    if (err) throw err;
    pwd = req.params.data;
    console.log("4",pwd);
  });
var arraygroup = [];
  app.post('/groups/add', (req, res) => {
    var thisgroup = [];
    var user = req.body.user;
    var group = req.body.groupname;
    var deletename = "";
    console.log(group,user);
    console.log("this is",arraygroup);
    db.collection("users").findOne({"username":user}, function(err, result) {
      if (result.groupname.length==0){
        console.log("group length is 0");
        //result.groupname.push(group);
        arraygroup.push(group);
        thisgroup.push(group);
        var array = thisgroup;
        //var array = arraygroup;
        console.log(array);
        console.log("this is",arraygroup);
        db.collection("users").findOneAndUpdate({"username":user},
        {$set: {username:result.username,
        password:result.password,
        groupname:array}},  function(err,doc) {
          if (!doc){
            console.log('Could not load Document');
          } else {
            if (err){
              res.status(400).send('Update failed');
            }else{
              var groups = {allgroup:array}
              db.collection("groups").insertOne(groups, function(err, res) {
                if (err) throw err;
                console.log("all group added");
                //console.log(res);
              });
              res.json(doc);
            }
          }
        });
      }else{
        console.log(arraygroup);
        console.log("inside", result.groupname);
        thisgroup = result.groupname;
        for (var i = 0; i<arraygroup.length; i++){

          console.log("array",arraygroup);
          //if (group === arraygroup[i]){
          if (arraygroup.indexOf(group) > -1){
            console.log("group already in")
          }else{
            console.log("group length is more than 0");
            //result.groupname.push(group);
            arraygroup.push(group);
            thisgroup.push(group);
            var array = thisgroup;
            db.collection("users").findOneAndUpdate({"username":user},
            {$set: {username:result.username,
            password:result.password,
            groupname:array}},  function(err,doc) {
              if (!doc){
                console.log('Could not load Document');
              } else {
                if (err){
                  res.status(400).send('Update failed');
                }else{
                  res.json(doc);
                  // var groups = {allgroup:array};
                  // console.log("this is arraygroup",arraygroup)
                  // db.collection("groups").insertOne(groups, function(err, res) {
                  //   if (err) throw err;
                  //   console.log("all group added");
                  //   //console.log(res);
                  // });
                  // res.json(doc);
                }
              }
            });
          }
        }
        var groups = {allgroup:arraygroup};
        console.log("this is arraygroup",arraygroup)
        db.collection("groups").insertOne(groups, function(err, res) {
          if (err) throw err;
          console.log("all group added");
          //console.log(res);
        });

      }
    });
  });
});
// db.collection("groups").findOne({"groupname":groups}, function(err, result) {
//   //console.log(result);
//   if (err) throw err;
//   if(result === null) {
//     console.log("notmatch");
//     db.collection("groups").insertOne(group, function(err, res) {
//       if (err) throw err;
//       console.log("group added");
//       //console.log(res);
//     });
//     res.send({"ok": true});
//   }else {
//     console.log("match");
//     res.send({"ok": false});
//   }
// });
app.use('/', router);

//app.listen(3000, () => console.log('Express server running on port 3000'));
