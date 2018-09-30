const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

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

  app.post('/groups/add', (req, res) => {
    var user = req.body.user;
    var group = req.body.groupname;
    console.log(group,user);
    db.collection("users").findOne({"username":user}, function(err, result) {
      if (result.groupname.length>0){
        result.groupname.push(group);
        var array = result.groupname;
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
            }
          }
        });
      }else{
        for (var i = 0; i<result.groupname.length; i++){
          if (group == result.groupname[i]){
            console.log("group already in")
          }else{
            result.groupname.push(group);
            var array = result.groupname;
            db.collection("users").findOneAndUpdate({"username":user},
            {$set: {username:result.username,
            password:result.username,
            groupname:array}},  function(err,doc) {
              if (!doc){
                console.log('Could not load Document');
              } else {
                if (err){
                  res.status(400).send('Update failed');
                }else{
                  res.json(doc);
                }
              }
            });
          }
        }
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

app.listen(3000, () => console.log('Express server running on port 3000'));
