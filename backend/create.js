module.exports = function(app, db){

  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("users Collection created!");
  });

  db.createCollection("groups", function(err, res) {
    if (err) throw err;
    console.log("groups Collection created!");
  });
}
