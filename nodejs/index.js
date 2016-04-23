var express = require('express');
var app = express();
var path = require("path");
var dir = path.join(__dirname, '/../front_end/');
console.log("Angular directory is: " + dir);
app.use(express.static(dir));
app.all('*', function (req, res) {
    console.log("Requst: ", req);
    res.sendFile(path.join(dir, 'index.html'));
});
app.listen(8080);