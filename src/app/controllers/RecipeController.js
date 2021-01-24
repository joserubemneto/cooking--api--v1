const RecipesRepository = require('../repositories/RecipesRepository')
const FilesRepository = require('../repositories/FilesRepository')

class RecipeController {
  async index(request, response) {
    const { orderBy } = request.query

    let recipes = await RecipesRepository.findAll(orderBy)

    const recipesTemp = await Promise.all(
      recipes.map(async (recipe) => {
        const file = await FilesRepository.find(recipe.file_id)

        return {
          ...recipe,
          avatar_url: `${request.protocol}://${
            request.headers.host
          }${file.path.replace('public', '')}`,
        }
      })
    )

    recipes = recipesTemp

    response.json(recipes)
  }

  async findByCategory(request, response) {
    const { category_id } = request.params

    let recipes = await RecipesRepository.findByCategory(category_id)

    const recipesTemp = await Promise.all(
      recipes.map(async (recipe) => {
        const file = await FilesRepository.find(recipe.file_id)

        return {
          ...recipe,
          avatar_url: `${request.protocol}://${
            request.headers.host
          }${file.path.replace('public', '')}`,
        }
      })
    )

    recipes = recipesTemp

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

    if (!request.file)
      return response.status(400).json({ error: 'Send at least one image' })

    if (!title) return response.status(400).json({ error: 'Title is required' })

    if (!ingredients)
      return response.status(400).json({ error: 'Ingredients is required' })

    if (!preparation)
      return response.status(400).json({ error: 'Preparation is required' })

    if (!category_id)
      return response.status(400).json({ error: 'Category is required' })

    if (!chef_id)
      return response.status(400).json({ error: 'Chef is required' })

    const file = await FilesRepository.create(request.file)

    const formatData = {
      ingredients: JSON.parse(ingredients),
      preparation: JSON.parse(preparation),
      tag_id: JSON.parse(tag_id),
    }

    const recipe = await RecipesRepository.create({
      title,
      ...formatData,
      information,
      category_id,
      chef_id,
      file_id: file.id,
    })

    response.json(recipe)
  }

  async show(request, response) {
    const { id } = request.params

    let recipe = await RecipesRepository.findById(id)

    if (!recipe) return response.status(404).json({ error: 'Recipe not found' })

    const file = await FilesRepository.find(recipe.file_id)

    recipe = {
      ...recipe,
      avatar_url: `${request.protocol}://${
        request.headers.host
      }${file.path.replace('public', '')}`,
    }

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

    const result = await RecipesRepository.findById(id)

    await FilesRepository.delete(result.file_id)

    await RecipesRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new RecipeController()
