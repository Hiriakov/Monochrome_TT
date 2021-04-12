const category = require('../models/category');
const product = require('../models/product');
const { getAllCategories } = require('./categories');


const getAllProducts = async () => {
  return await product.find();
};


const renderMain = async (ctx) => {

  const products = await getAllProducts(ctx);
  const categories = await getAllCategories(ctx);
  await ctx.render('index', { products, categories });

}


const getProductById = async (ctx) => {

  const id = ctx.params.id
  const category = await product.findById(id)
  return category;

};


const getProduct = async (ctx) => {

  const categories = await category.find();
  await ctx.render('create', { categories });

};


const createProduct = async (ctx) =>  {

  const newProduct = new product({
    name: ctx.request.body.name,
    category: ctx.request.body.category,
    price: ctx.request.body.price,
    inStock: ctx.request.body.inStock
  })
  await newProduct.save()
  ctx.status = 201;
  await ctx.redirect('/')

};


const updateProduct = async (ctx) => {
  
  const updated = {
    name: ctx.request.body.name,
    category: ctx.request.body.category,
    price: ctx.request.body.price,
    inStock: ctx.request.body.inStock
  }

  const id = ctx.params.id;
  await product.findByIdAndUpdate(id, updated, {new: true})
  ctx.status = 200;
  await ctx.redirect('/');
  
};


const editProduct = async (ctx) => {

  const product = await getProductById(ctx);
  const categories = await getAllCategories(ctx);
  await ctx.render('edit', { categories, product });

}


const deleteProduct = async (ctx) => {
  await product.findByIdAndDelete(ctx.params.id);
  await ctx.redirect('/');
};


const getStatistics = async () => {

  const statistics = await product.aggregate([
      {
          $group: {
              _id: '$category',
              productsQuantity: { $sum: '$inStock' },
              averagePrice: { $avg:  '$price' },
              totalSum: {	$sum: { $multiply: ['$price', '$inStock'] }	},
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' }
          }
      }
  ])

  await Promise.all(statistics.map(async (c) => {
    const categoryById = await category.findById(c._id)
    c.name = categoryById.name;
  }));

  return statistics;
};


const renderStatistics = async ctx => {
  const categories = await getStatistics();
  await ctx.render('statistics', { categories });
};


module.exports = { createProduct, updateProduct, deleteProduct, renderStatistics, editProduct, renderMain, getProduct };