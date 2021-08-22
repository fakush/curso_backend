"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var http = __importStar(require("http"));
var socket_1 = __importDefault(require("./services/socket"));
var productos_1 = __importDefault(require("./routes/productos"));
var assetFilesManager_1 = __importDefault(require("./utils/assetFilesManager"));
/* Innicialización Server + handlebars */
var app = express_1.default();
var port = 8080;
var myServer = new http.Server(app);
socket_1.default(myServer);
myServer.listen(port, function () { return console.log('Server up en puerto', port); });
myServer.on('error', function (err) {
    console.log('Server init error:', err);
});
var publicPath = path_1.default.resolve(__dirname, '../public');
var layoutDirPath = path_1.default.resolve(__dirname, '../views/layouts');
var defaultLayerPth = path_1.default.resolve(__dirname, '../views/layouts/index.hbs');
var partialDirPath = path_1.default.resolve(__dirname, '../views/partials');
app.use(express_1.default.static(publicPath));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine('hbs', express_handlebars_1.default({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
}));
// Data Aux
var loadMyArray = new assetFilesManager_1.default('productos.json');
var myArray = JSON.parse(loadMyArray.read());
var listData = { isList: false, isForm: true, addItem: true, productItem: myArray };
// IndexPage render
app.get('/', function (req, res) {
    res.render('main', listData);
});
// Routers
app.use('/api/productos', productos_1.default);
