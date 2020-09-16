import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
const livereload = require('livereload');
const io = require('socket.io')(5500);

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '../public'));

var connectLivereload = require('connect-livereload');

const app = express();
// const port = process.env.PORT || 3000;

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');
app.use(connectLivereload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/scripts', express.static(`${__dirname}/node_module/`));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// socket
io.on('connection', (socket) => {
  socket.emit('chat-message', 'Hello World');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

export default app;
// app.listen(port, () => {
//    console.log('listening on %d', port);
// });
