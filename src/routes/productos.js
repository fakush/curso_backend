import express from 'express';

const router = express.Router();

// Lógica Aux
let myArray = [
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
router.get('/vista', (req, res) => {
  if (myArray.length === 0) {
    res.json({
      error: 'no hay productos cargados',
    });
  }

  const listData = {
    isList: true,
    productItem: myArray,
  };

  return res.render('main', listData);
});

// Producto por id
router.get('/vista/:id', (req, res) => {
  const { id } = req.params;
  const searchItem = myArray.find((itemId) => itemId.id === Number(id));
  if (!searchItem) {
    return res.status(404).json({
      error: `producto no encontrado: ${id}.`,
    });
  }
  const listData = {
    isList: true,
    productItem: [searchItem],
  };

  return res.render('main', listData);
});

// Añadir producto al array
router.get('/guardar', (req, res) => {
  const isForm = { isForm: true, addItem: true };
  return res.render('main', isForm);
});
router.post('/guardar', (req, res) => {
  const { body } = req;
  if (
    !body.title ||
    typeof body.title !== 'string' ||
    !body.price ||
    typeof Number(body.price) !== 'number' ||
    !body.thumbnail ||
    typeof body.thumbnail !== 'string'
  ) {
    return res.status(400).json({
      msg: 'post invalido',
    });
  }

  const nextId = myArray.reduce((item, max) => (item.id > max ? item.id : max), 0);

  const newEntry = {
    id: nextId.id + 1,
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
  };

  myArray.push(newEntry);
  const isForm = { isForm: true, addItem: true };
  return res.render('main', isForm);
});

// Actualizar un producto
router.get('/actualizar', (req, res) => {
  const isUpdate = { isUpdate: true };
  return res.render('main', isUpdate);
});
router.put('/actualizar/:id', (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;
  const index = myArray.findIndex((item) => Number(item.id) === id);
  if (index < 0) {
    return res.status(404).json({
      msg: 'Invalid id',
    });
  }
  if (
    !body.title ||
    typeof body.title !== 'string' ||
    !body.price ||
    typeof Number(body.price) !== 'number' ||
    !body.thumbnail ||
    typeof body.thumbnail !== 'string'
  ) {
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
router.delete('/borrar/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = myArray.findIndex((item) => Number(item.id) === id);
  if (index < 0) {
    return res.status(404).json({
      msg: 'Invalid id',
    });
  }
  myArray = myArray.filter((item) => Number(item.id) !== id);

  return res.json({
    data: myArray,
  });
});

export default router;
