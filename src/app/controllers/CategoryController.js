const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query

    const categories = await CategoriesRepository.findAll(orderBy)

    response.json(categories)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })

    const categoryExists = await CategoriesRepository.findByName(name)

    if (categoryExists) return response.status(400).json({ error: 'Category already exists' })

    const category = await CategoriesRepository.create({ name })

    response.json(category)
  }

  async show(request, response) {
    const { id } = request.params

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists) return response.status(404).json({ error: 'Category not found' })

    response.json(categoryExists)
  }

  update() {

  }

  delete() {

  }
}

module.exports = new CategoryController()
