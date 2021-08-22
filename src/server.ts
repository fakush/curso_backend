import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import * as http from 'http';
import initWsServer from './services/socket';
import routerProductos from './routes/productos';
import AuxFile from './utils/assetFilesManager';

/* Innicialización Server + handlebars */
const app = express();
const port = 8080;
const myServer = new http.Server(app);
initWsServer(myServer);
myServer.listen(port, () => console.log('Server up en puerto', port));
myServer.on('error', (err: any) => {
  console.log('Server init error:', err);
});
const publicPath = path.resolve(__dirname, '../public');
const layoutDirPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../views/partials');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

// Data Aux
const loadMyArray = new AuxFile('productos.json');
const myArray = JSON.parse(loadMyArray.read());
const listData = { isList: false, isForm: true, addItem: true, productItem: myArray };

// IndexPage render
app.get('/', (req, res) => {
  res.render('main', listData);
});

// Routers
app.use('/api/productos', routerProductos);
