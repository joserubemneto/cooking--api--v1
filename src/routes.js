const { Router } = require('express')

const router = Router()
const multer = require('./app/middlewares/multer')
const RecipeController = require('./app/controllers/RecipeController')
const CategoryController = require('./app/controllers/CategoryController')
const ChefController = require('./app/controllers/ChefController')
const TagController = require('./app/controllers/TagController')

router.get('/recipes', RecipeController.index)
router.get('/recipes/:category_id', RecipeController.findByCategory)
router.post('/recipes', multer.single('file'), RecipeController.store)
router.get('/recipe/:id', RecipeController.show)
router.put('/recipe/:id', RecipeController.update)
router.delete('/recipe/:id', RecipeController.delete)

router.get('/categories', CategoryController.index)
router.post('/categories', multer.single('file'), CategoryController.store)
router.get('/category/:id', CategoryController.show)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

router.get('/chefs', ChefController.index)
router.post('/chefs', multer.single('file'), ChefController.store)
router.get('/chef/:id', ChefController.show)
router.put('/chef/:id', ChefController.update)
router.delete('/chef/:id', ChefController.delete)

router.get('/highlights', TagController.index)
router.post('/highlights', TagController.store)
router.get('/highlight/:id', TagController.show)
router.put('/highlight/:id', TagController.update)
router.delete('/highlight/:id', TagController.delete)

module.exports = router
