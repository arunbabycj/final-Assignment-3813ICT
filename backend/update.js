module.exports = function(app, db){

  app.post('/issues/update/:id', (req, res) => {
    console.log(req.body);
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params.id;
    var o_id = new ObjectId(id);
    // db.collection("products").find({"_id":o_id}).toArray(function(err, issue){
    db.collection("users").findOneAndUpdate({"_id":o_id},
      {$set: {name:req.body.name,
             price:req.body.price,
             description:req.body.description,
             type:req.body.type}},  function(err,doc) {
      //console.log(issue);
      if (!doc)
          console.log('Could not load Document');
      else {
            if (err)
                res.status(400).send('Update failed');
            else
              res.json('Update done');
      }
    });
  });
}
