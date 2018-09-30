module.exports = function(app, db){

  app.get('/issues', (req, res) => {
    db.collection("users").find({}).toArray(function(err, issues) {
      if (err)
          console.log(err);
      else
          res.json(issues);
    });
  });

  app.get('/issues/:id', (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params.id;
    var o_id = new ObjectId(id);
      db.collection("users").find({"_id":o_id}).toArray(function(err, issue) {
          if (err)
              console.log(err);
          else
          //console.log(issue);
              res.json(issue);
      });
  });

  app.get('/groups/:user', (req, res) => {
    //console.log(req.body)
    db.collection("users").findOne({"username":req.params.user}, function(err, issues) {
      //db.collection("users").findOne({"username":user}, function(err, result) {
      console.log("issues",issues);
      if (err)
          console.log(err);
      else
          res.json(issues);
    });
  });

}
