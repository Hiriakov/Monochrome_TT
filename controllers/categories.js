const Category = require('../models/category')

const getAllCategories = async (ctx) => {
  return await Category.find();
}

const getOneCategory = async (ctx) => {
  return await Category.findById(ctx.params.id);
}


const createCategory = async (ctx) => {

  const category = new Category({
    name: ctx.request.body.name
  })
  await category.save()
  ctx.status = 201

}


const updateCategory = async (ctx) =>  {

  const name = {
    name: ctx.request.body.name
  }
  const id = ctx.params.id
  await Category.findByIdAndUpdate(id, name, {new: true})
  
}


const deleteCategory = async (ctx) =>  {

  await Category.findOneAndRemove(ctx.params.id)
  ctx.status = 200

}

module.exports = { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory };