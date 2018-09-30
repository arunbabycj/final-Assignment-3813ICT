module.exports = function(app, db){
  app.post('/issues/add', (req, res) => {
    var name = req.body.username;
    var myobj = {username: req.body.username,
                password:req.body.password,
                groupname:[]
                };
    db.collection("users").findOne({"username":name}, function(err, result) {
      console.log(result);
      if (err) throw err;
      if(result === null) {
        console.log("notmatch");
        db.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("data added");
          console.log(res);

        });
        res.send({"ok": true});
      }else {
        console.log("match");
        res.send({"ok": false});
      }
    });

  });
}
