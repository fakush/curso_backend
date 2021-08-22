"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _productos = _interopRequireDefault(require("./routes/productos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

/* Innicialización Server + handlebars */
const app = (0, _express.default)();
const port = 8080;
const server = app.listen(port, () => console.log('Server up en puerto', port));
server.on('error', err => {
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
})); // IndexPage render

app.get('/', (req, res) => {
  res.render('main');
}); // Routers

app.use('/api/productos', _productos.default);