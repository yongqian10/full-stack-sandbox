"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var livereload = require('livereload');

var io = require('socket.io')(5500);

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(_path["default"].join(__dirname, '../public'));

var connectLivereload = require('connect-livereload');

var app = (0, _express["default"])(); // const port = process.env.PORT || 3000;
// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');

app.use(connectLivereload());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])()); // app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use('/scripts', _express["default"]["static"]("".concat(__dirname, "/node_module/"))); // routes

app.use('/', _index["default"]);
app.use('/users', _users["default"]); // socket

io.on('connection', function (socket) {
  socket.emit('chat-message', 'Hello World');
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.use(function (req, res) {
  return res.sendFile("".concat(__dirname, "/public/index.html"));
});
var _default = app; // app.listen(port, () => {
//    console.log('listening on %d', port);
// });

exports["default"] = _default;