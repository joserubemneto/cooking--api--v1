const TagsRepository = require('../repositories/TagsRepository')

class TagController {
  async index(request, response) {
    const tags = await TagsRepository.findAll()

    response.json(tags)
  }

  async show(request, response) {
    const { id } = request.params

    const tag = await TagsRepository.findById(id)
    const recipes = await TagsRepository.findRecipes(id)

    response.json({ ...tag, recipes })
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })

    const tag = await TagsRepository.create(name)

    response.json(tag)
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const tag = await TagsRepository.update(id, { name })

    response.json(tag)
  }

  async delete(request, response) {
    const { id } = request.params

    await TagsRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new TagController()
