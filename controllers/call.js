const socket_io = require('../bin/www');
const cv = require('opencv4nodejs');

var camera = undefined;
var display = undefined;

exports.connect = (req, res) => {
  const FPS = 10;
  const io = socket_io.getSocketIo();
  camera = new cv.VideoCapture(0);
  io.on('connect', (socket) => {
    camera.set(cv.CAP_PROP_FRAME_WIDTH, 300);
    camera.set(cv.CAP_PROP_FRAME_HEIGHT, 300);
    display = setInterval(() => {
      let frame = camera.read();
      let image = cv.imencode('.jpg', frame).toString('base64');
      socket.emit('image', image);
    }, 1000 / FPS);
  });
  return res.render('call');
}

exports.disconnect = (req, res) => {
  clearInterval(display);
  camera.release();
  return res.redirect('/');
}