const { Router } = require('express')

const router = Router()
const RecipeController = require('./app/controllers/RecipeController')
const CategoryController = require('./app/controllers/CategoryController')

router.get('/recipes', RecipeController.index)
router.post('/recipes', RecipeController.store)
router.get('/recipe/:id', RecipeController.show)
router.put('/recipe/:id', RecipeController.update)
router.delete('/recipe/:id', RecipeController.delete)

router.get('/categories', CategoryController.index)
router.post('/categories', CategoryController.post)
router.get('/category/:id', CategoryController.show)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

module.exports = router
