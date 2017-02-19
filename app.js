var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//create default route
app.get('/', function(req, res){
    res.send('Welcome to the Blood Donation API');
});

//listen on the port
app.listen(port, function(){
    console.log('Server Started on port ' + port);
});