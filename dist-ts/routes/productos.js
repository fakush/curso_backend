"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// Lógica Aux
var myArray = [
    {
        id: 1,
        title: 'Escuadra',
        price: '123.45',
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png',
    },
    {
        id: 2,
        title: 'Calculadora',
        price: '234.56',
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png',
    },
    {
        id: 3,
        title: 'Globo Terráqueo',
        price: '345.67',
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    },
];
// Listado de productos
router.get('/vista', function (req, res) {
    if (myArray.length === 0) {
        res.json({
            error: 'no hay productos cargados',
        });
    }
    var listData = {
        isList: true,
        productItem: myArray,
    };
    return res.render('main', listData);
});
// Producto por id
router.get('/vista/:id', function (req, res) {
    var id = req.params.id;
    var searchItem = myArray.find(function (itemId) { return itemId.id === Number(id); });
    if (!searchItem) {
        return res.status(404).json({
            error: "producto no encontrado: " + id + ".",
        });
    }
    var listData = {
        isList: true,
        productItem: [searchItem],
    };
    return res.render('main', listData);
});
// Añadir producto al array
router.get('/guardar', function (req, res) {
    var isForm = { isForm: true, addItem: true };
    return res.render('main', isForm);
});
router.post('/guardar', function (req, res) {
    var body = req.body;
    if (!body.title ||
        typeof body.title !== 'string' ||
        !body.price ||
        typeof Number(body.price) !== 'number' ||
        !body.thumbnail ||
        typeof body.thumbnail !== 'string') {
        return res.status(400).json({
            msg: 'post invalido',
        });
    }
    var nextId = myArray.reduce(function (item, max) { return (item.id > max ? item.id : max); }, 0);
    var newEntry = {
        id: nextId.id + 1,
        title: body.title,
        price: body.price,
        thumbnail: body.thumbnail,
    };
    myArray.push(newEntry);
    var isForm = { isForm: true, addItem: true };
    return res.render('main', isForm);
});
// Actualizar un producto
router.get('/actualizar', function (req, res) {
    var isUpdate = { isUpdate: true };
    return res.render('main', isUpdate);
});
router.put('/actualizar/:id', function (req, res) {
    var id = Number(req.params.id);
    var body = req.body;
    var index = myArray.findIndex(function (item) { return Number(item.id) === id; });
    if (index < 0) {
        return res.status(404).json({
            msg: 'Invalid id',
        });
    }
    if (!body.title ||
        typeof body.title !== 'string' ||
        !body.price ||
        typeof Number(body.price) !== 'number' ||
        !body.thumbnail ||
        typeof body.thumbnail !== 'string') {
        return res.status(400).json({
            msg: 'post invalido',
        });
    }
    myArray[index].title = body.title;
    myArray[index].price = Number(body.price);
    myArray[index].thumbnail = body.thumbnail;
    return res.status(201).json({
        data: myArray[index],
    });
});
// Eliminar un producto
router.delete('/borrar/:id', function (req, res) {
    var id = Number(req.params.id);
    var index = myArray.findIndex(function (item) { return Number(item.id) === id; });
    if (index < 0) {
        return res.status(404).json({
            msg: 'Invalid id',
        });
    }
    myArray = myArray.filter(function (item) { return Number(item.id) !== id; });
    return res.json({
        data: myArray,
    });
});
exports.default = router;
