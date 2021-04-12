const Router = require('koa-router');
const { createProduct, deleteProduct, updateProduct, renderStatistics, editProduct, renderMain, getProduct } = require('../controllers/products');
const router = new Router();


router.get('/', renderMain); //
router.get('/product/create', getProduct); //
router.post('/product/create', createProduct);
router.get('/product/edit/:id', editProduct); //
router.post('/product/edit/:id', updateProduct);
router.get('/product/delete/:id', deleteProduct);
router.get('/statistics', renderStatistics); //


module.exports = router;