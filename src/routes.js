const { Router } = require('express')

const router = Router()
const RecipeController = require('./app/controllers/RecipeController')
const CategoryController = require('./app/controllers/CategoryController')
const ChefController = require('./app/controllers/ChefController')

router.get('/recipes', RecipeController.index)
router.get('/recipes/:category_id', RecipeController.findByCategory)
router.post('/recipes', RecipeController.store)
router.get('/recipe/:id', RecipeController.show)
router.put('/recipe/:id', RecipeController.update)
router.delete('/recipe/:id', RecipeController.delete)

router.get('/categories', CategoryController.index)
router.post('/categories', CategoryController.store)
router.get('/category/:id', CategoryController.show)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

router.get('/chefs', ChefController.index)
router.post('/chefs', ChefController.store)
router.get('/chef/:id', ChefController.show)
router.put('/chef/:id', ChefController.update)
router.delete('/chef/:id', ChefController.delete)

module.exports = router
