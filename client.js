var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io-client")("http://localhost.bskyb.com:1234", {reconnect: true});

io.on("connect", function() {
  console.log('Connected');
  io.on("speice-", function(data) {
    console.log(data);
  });
});

app.get("/", function(req, res) {
  res.setRe
});

server.listen((process.env.PORT || 2345), function() {
  console.log("App started on: localhost:2345");
});
