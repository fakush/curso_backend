"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var moment_1 = __importDefault(require("moment"));
var messages_1 = __importDefault(require("../utils/messages"));
var assetFilesManager_1 = __importDefault(require("../utils/assetFilesManager"));
// Lógica Aux
var data = { username: undefined, text: undefined, time: undefined };
var loadMyArray = new assetFilesManager_1.default('productos.json');
var myArray = JSON.parse(loadMyArray.read());
var sendToLog = new assetFilesManager_1.default('chat.log');
var nextId = function () { return myArray.reduce(function (item, max) { return (item.id > max ? item.id : max); }, 0); };
var initWsServer = function (server) {
    var io = socket_io_1.default(server);
    io.on('connection', function (socket) {
        console.log('Nueva Conexion establecida');
        // Lógica Lista Productos
        socket.on('askData', function () {
            socket.emit('productMessages', myArray);
        });
        socket.on('new-product-message', function (prodcutData) {
            var newMessage = {
                id: Number(nextId().id) + 1,
                title: prodcutData.title,
                price: prodcutData.price,
                thumbnail: prodcutData.thumbnail,
            };
            myArray.push(newMessage);
            io.emit('productMessages', myArray);
        });
        socket.on('chatMessage', function (msg) {
            data.username = msg.user;
            data.text = msg.message;
            data.time = moment_1.default().format('h:mm a');
            io.emit('chat-message', messages_1.default(data));
            console.log(messages_1.default(data));
            sendToLog.write(JSON.stringify(messages_1.default(data)));
        });
    });
    return io;
};
exports.default = initWsServer;
