"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _socket = _interopRequireDefault(require("./services/socket"));

var _productos = _interopRequireDefault(require("./routes/productos"));

var _assetFilesManager = _interopRequireDefault(require("./utils/assetFilesManager"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Innicialización Server + handlebars */
const app = (0, _express.default)();
const port = 8080;
const myServer = http.Server(app);
(0, _socket.default)(myServer);
myServer.listen(port, () => console.log('Server up en puerto', port));
myServer.on('error', err => {
  console.log('Server init error:', err);
});

const publicPath = _path.default.resolve(__dirname, '../public');

const layoutDirPath = _path.default.resolve(__dirname, '../views/layouts');

const defaultLayerPth = _path.default.resolve(__dirname, '../views/layouts/index.hbs');

const partialDirPath = _path.default.resolve(__dirname, '../views/partials');

app.use(_express.default.static(publicPath));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars.default)({
  layoutsDir: layoutDirPath,
  extname: 'hbs',
  defaultLayout: defaultLayerPth,
  partialsDir: partialDirPath
})); // Data Aux

const loadMyArray = new _assetFilesManager.default('productos.json');
const myArray = JSON.parse(loadMyArray.read());
const listData = {
  isList: false,
  isForm: true,
  addItem: true,
  productItem: myArray
}; // IndexPage render

app.get('/', (req, res) => {
  res.render('main', listData);
}); // Routers

app.use('/api/productos', _productos.default);