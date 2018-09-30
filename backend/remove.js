module.exports = function(app, db){

  app.get('/issues/delete/:id', (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params.id;
    var o_id = new ObjectId(id);
      db.collection("users").deleteOne({"_id":o_id}, function(err, issue) {
          if (err)
              res.json(err);
          else
              res.json('Removed successfully');
      });
  });
}
