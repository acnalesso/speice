var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/views/index.html");
});

app.get("/control", function(req, res) {
  res.sendfile(__dirname + "/views/control.html");
});

io.on("connection", function(socket) {
  socket.on("change", function(data) {
    console.log(data);
    io.emit("change", data);
  });
});

server.listen((process.env.PORT || 1234), function() {
  console.log("App started on: localhost:1234");
});
