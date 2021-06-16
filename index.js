//var express = require('express');
let {Sequelize} = require('sequelize');
//var app = express();

console.log("setting up the examples");

/* In this example, we are discussing sequlaize.

First, we need to establish a connection to the database.

If we want to create a connection to a database, we must create
an instance of sequalize. Let us also not forget to require sequalize 
module for our example.
*/

// Instance of Sequalize
var sequelize = new Sequelize('postgres://postgres:Password@localhost/postgres');

//Let's test the connection that we have created in the above line

try{
    sequelize.authenticate();
    console.log("The connect has been established.")
}catch(er){
    console.log("Some error", er);
}


/*  A Model in an abstraction that represents a table in your database.

*/

/*The following create a table if it does not exist.

*/
var Hat = sequelize.define('Hat', {
    //create name and material as strings,
    name: Sequelize.STRING,
    material: Sequelize.STRING,
    //height as an integer,
    height: Sequelize.INTEGER,
    //and brim as a true/false
    brim: Sequelize.BOOLEAN
   });


   Hat
   //ensure the table exists,
   .sync()
   .then(function(){
   //`Hat` is now ready to be used.

   //console.log("The table is ready to be used");
   })



/* Command for data insert into a table called Hats.
*/
   Hat.create({
    name: 'cowboy',
    material: 'straw',
    height: 4,
    brim: true
   });/**/


   Hat.findAll().then(function(rows) {
    for(var i = 0; i < rows.length; i++) {
    var columnData = rows[i].dataValues;
    var name = columnData.name;
    var brim = columnData.brim;
    console.log(name + " " + brim);
    }
   });


  let id = 2;
   Hat.findByPk(id).then(function (row) {
    var name = row.dataValues.name;
    var brim = row.dataValues.brim;
    console.log("Finding by Id " +name + " " + brim);
   });
/**/
console.log(Hat === sequelize.models.Hat);

/* To close a connection. we have to use: connectionName.close();
*/
//sequelize.close();

/*let port = 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
   });*/