const RecipesRepository = require('../repositories/RecipesRepository')

class RecipeController {
  async index(request, response) {
    const { orderBy } = request.query

    const recipes = await RecipesRepository.findAll(orderBy)

    response.json(recipes)
  }

  async findByCategory(request, response) {
    const { category_id } = request.params

    const recipes = await RecipesRepository.findByCategory(category_id)

    response.json(recipes)
  }

  async store(request, response) {
    const {
      title,
      ingredients,
      preparation,
      information,
      category_id,
      chef_id,
      tag_id,
    } = request.body

    if (!title) return response.status(400).json({ error: 'Title is required' })

    if (!ingredients)
      return response.status(400).json({ error: 'Ingredients is required' })

    if (!preparation)
      return response.status(400).json({ error: 'Preparation is required' })

    if (!category_id)
      return response.status(400).json({ error: 'Category is required' })

    if (!chef_id)
      return response.status(400).json({ error: 'Chef is required' })

    const recipe = await RecipesRepository.create({
      title,
      ...formatData,
      information,
      category_id,
      chef_id,
      tag_id,
    })

    response.json(recipe)
  }

  async show(request, response) {
    const { id } = request.params

    const recipe = await RecipesRepository.findById(id)

    if (!recipe) return response.status(404).json({ error: 'Recipe not found' })

    response.json(recipe)
  }

  async update(request, response) {
    const { id } = request.params
    const {
      title,
      ingredients,
      preparation,
      information,
      category_id,
      chef_id,
      tag_id,
    } = request.body

    const recipeExists = await RecipesRepository.findById(id)

    if (!recipeExists)
      return response.status(404).json({ error: 'Recipe not exists' })

    if (!title) return response.status(400).json({ error: 'Title is required' })

    if (!ingredients)
      return response.status(400).json({ error: 'Ingredients is required' })

    if (!preparation)
      return response.status(400).json({ error: 'Preparation is required' })

    if (!category_id)
      return response.status(400).json({ error: 'Category is required' })

    if (!chef_id)
      return response.status(400).json({ error: 'Chef is required' })

    const recipe = await RecipesRepository.update(id, {
      title,
      ingredients,
      preparation,
      information,
      category_id,
      chef_id,
      tag_id,
    })

    response.json(recipe)
  }

  async delete(request, response) {
    const { id } = request.params

    await RecipesRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new RecipeController()
