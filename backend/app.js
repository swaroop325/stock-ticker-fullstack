const app = require('express')();
const http = require('http').Server(app);

//Create server and listen on port 8000
http.listen(8000, function() {
    console.log('Listening on *:8000');
});