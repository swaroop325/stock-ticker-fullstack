const app = require('express')();
const cors = require("cors")
const http = require('http').Server(app);
const getRoutes = require('./apiRoute/getRoutes');
const { generateCurrentStockPrice } = require('./utils/utils');
const PORT = 8000;

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

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
    let stockprice = generateCurrentStockPrice();
    //Serve emits price down to client
    io.emit('stock price', stockprice);
}, 3000);

//Create server and listen on port 8000
http.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
});