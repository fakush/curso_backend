import socketIo from 'socket.io';
import moment from 'moment';
import formatMessages from '../utils/messages';
import AuxFile from '../utils/assetFilesManager';

// Lógica Aux
const data = { username: undefined, text: undefined, time: undefined };
const loadMyArray = new AuxFile('productos.json');
const myArray = JSON.parse(loadMyArray.read());
const sendToLog = new AuxFile('chat.log');

const nextId = () => myArray.reduce((item, max) => (item.id > max ? item.id : max), 0);

const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida');

    // Lógica Lista Productos

    socket.on('askData', () => {
      socket.emit('productMessages', myArray);
    });

    socket.on('new-product-message', (prodcutData) => {
      const newMessage = {
        id: Number(nextId().id) + 1,
        title: prodcutData.title,
        price: prodcutData.price,
        thumbnail: prodcutData.thumbnail,
      };
      myArray.push(newMessage);
      io.emit('productMessages', myArray);
    });

    socket.on('chatMessage', (msg) => {
      data.username = msg.user;
      data.text = msg.message;
      data.time = moment().format('h:mm a');
      io.emit('chat-message', formatMessages(data));
      console.log(formatMessages(data));
      sendToLog.write(JSON.stringify(formatMessages(data)));
    });
  });

  return io;
};

export default initWsServer;
