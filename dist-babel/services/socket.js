"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _moment = _interopRequireDefault(require("moment"));

var _messages = _interopRequireDefault(require("../utils/messages"));

var _assetFilesManager = _interopRequireDefault(require("../utils/assetFilesManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lógica Aux
const data = {
  username: undefined,
  text: undefined,
  time: undefined
};
const loadMyArray = new _assetFilesManager.default('productos.json');
const myArray = JSON.parse(loadMyArray.read());
const sendToLog = new _assetFilesManager.default('chat.log');

const nextId = () => myArray.reduce((item, max) => item.id > max ? item.id : max, 0);

const initWsServer = server => {
  const io = (0, _socket.default)(server);
  io.on('connection', socket => {
    console.log('Nueva Conexion establecida'); // Lógica Lista Productos

    socket.on('askData', () => {
      socket.emit('productMessages', myArray);
    });
    socket.on('new-product-message', prodcutData => {
      const newMessage = {
        id: Number(nextId().id) + 1,
        title: prodcutData.title,
        price: prodcutData.price,
        thumbnail: prodcutData.thumbnail
      };
      myArray.push(newMessage);
      io.emit('productMessages', myArray);
    });
    socket.on('chatMessage', msg => {
      data.username = msg.user;
      data.text = msg.message;
      data.time = (0, _moment.default)().format('h:mm a');
      io.emit('chat-message', (0, _messages.default)(data));
      console.log((0, _messages.default)(data));
      sendToLog.write(JSON.stringify((0, _messages.default)(data)));
    });
  });
  return io;
};

var _default = initWsServer;
exports.default = _default;