const app = require('express')();
const http = require('http').Server(app);
const getRoutes = require('./apiRoute/getRoutes');
const { generateStockPrice } = require('./utils/utils');
const PORT = 8000;

// basic routing
app.use('/', getRoutes);

//websocket settings
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});


io.on('connection', function (socket) {
    console.log('A new WebSocket connection has been established');
});

setInterval(function () {
    let stockprice = generateStockPrice();
    //Serve emits price down to client
    io.emit('stock price', stockprice);
}, 1000);

//Create server and listen on port 8000
http.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
});