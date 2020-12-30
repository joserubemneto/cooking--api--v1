const RecipesRepository = require('../repositories/RecipesRepository')

class RecipeController {
  async index(request, response) {
    const { orderBy } = request.query

    const recipes = await RecipesRepository.findAll(orderBy)

    response.json(recipes)
  }
}

module.exports = new RecipeController()
