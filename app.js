const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const date = require(__dirname + "/date.js");

var items = ["Buy Food", "Cook Food", "Cooking"];
var workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set("view engine", "ejs"); 

app.get('/', function(req, res) {

    let day = date.getDay();

    res.render("list.ejs", {listTitle: day, newListItems: items});
});

app.post('/', function(req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list.ejs" ,{listTitle: "Work", newListItems: workItems})
})

app.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});