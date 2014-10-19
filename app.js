var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);


app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

app.get("/", function(req, res) {
    res.sendfile(__dirname + "/views/index.html");
});

io.on("connection", function(socket) {
    socket.on("Pi", function(data) {
      io.emit("Pi", data);
    });
});

server.listen((process.env.PORT || 1234), function() {
    console.log("App started! on: localhost:1234")
});
