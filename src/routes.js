const { Router } = require('express')

const router = Router()
const RecipeController = require('./app/controllers/RecipeController')

router.get('/recipes', RecipeController.index)
router.post('/recipes', RecipeController.store)
router.get('/recipe/:id', RecipeController.show)
router.put('/recipe/:id', RecipeController.update)
router.delete('/recipe/:id', RecipeController.delete)

module.exports = router
