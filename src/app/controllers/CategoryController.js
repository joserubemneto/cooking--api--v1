const CategoriesRepository = require('../repositories/CategoriesRepository')
const FilesRepository = require('../repositories/FilesRepository')

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query

    let categories = await CategoriesRepository.findAll(orderBy)

    const categoriesTemp = await Promise.all(
      categories.map(async (category) => {
        const file = await FilesRepository.find(category.file_id)

        return {
          ...category,
          avatar_url: `${request.protocol}://${
            request.headers.host
          }${file.path.replace('public', '')}`,
        }
      })
    )

    categories = categoriesTemp

    response.json(categories)
  }

  async store(request, response) {
    const { name } = request.body

    if (!request.file)
      return response.status(400).json({ error: 'Send at least one image' })

    if (!name) return response.status(400).json({ error: 'Name is required' })

    const categoryExists = await CategoriesRepository.findByName(name)

    if (categoryExists)
      return response
        .status(400)
        .json({ error: 'This Category already exists' })

    const file = await FilesRepository.create(request.file)

    const category = await CategoriesRepository.create({
      name,
      file_id: file.id,
    })

    response.json(category)
  }

  async show(request, response) {
    const { id } = request.params

    let categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists)
      return response.status(404).json({ error: 'Category not found' })

    const file = await FilesRepository.find(categoryExists.file_id)

    categoryExists = {
      ...categoryExists,
      avatar_url: `${request.protocol}://${
        request.headers.host
      }${file.path.replace('public', '')}`,
    }

    response.json(categoryExists)
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists)
      return response.status(400).json({ error: 'This category not exists' })
    if (!name) return response.status(400).json({ error: 'Name is required' })

    const category = await CategoriesRepository.update(id, { name })

    response.json(category)
  }

  async delete(request, response) {
    const { id } = request.params

    const result = await CategoriesRepository.findById(id)

    await FilesRepository.delete(result.file_id)

    await CategoriesRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new CategoryController()
