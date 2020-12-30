const RecipesRepository = require('../repositories/RecipesRepository')

class RecipeController {
  async index(request, response) {
    const { orderBy } = request.query

    const recipes = await RecipesRepository.findAll(orderBy)

    response.json(recipes)
  }

  async store(request, response) {
    const { title, ingredients, preparation, information } = request.body

    if (!title) return response.status(400).json({ error: 'Title is required' })
    if (!ingredients) return response.status(400).json({ error: 'Ingredients is required' })
    if (!preparation) return response.status(400).json({ error: 'Preparation is required' })

    const recipe = await RecipesRepository.create({ title, ingredients, preparation, information })

    response.json(recipe)
  }
}

module.exports = new RecipeController()
