const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query

    const categories = await CategoriesRepository.findAll(orderBy)

    response.json(categories)
  }

  async store(request, response) {
    const { name, img_url } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!img_url)
      return response.status(400).json({ error: 'Image is required' })

    const categoryExists = await CategoriesRepository.findByName(name)

    if (categoryExists)
      return response
        .status(400)
        .json({ error: 'This Category already exists' })

    const category = await CategoriesRepository.create({ name, img_url })

    response.json(category)
  }

  async show(request, response) {
    const { id } = request.params

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists)
      return response.status(404).json({ error: 'Category not found' })

    response.json(categoryExists)
  }

  async update(request, response) {
    const { id } = request.params
    const { name, img_url } = request.body

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists)
      return response.status(400).json({ error: 'This category not exists' })
    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!img_url)
      return response.status(400).json({ error: 'Image is required' })

    const category = await CategoriesRepository.update(id, { name })

    response.json(category)
  }

  async delete(request, response) {
    const { id } = request.params

    await CategoriesRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new CategoryController()
