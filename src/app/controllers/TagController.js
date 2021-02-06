const TagsRepository = require('../repositories/TagsRepository')

class TagController {
  async index(request, response) {
    try {
      const tags = await TagsRepository.findAll()

      response.json(tags)
    } catch (err) {
      console.log(err)
      console.log('Erro aqui')
    }
  }

  async show(request, response) {
    const { id } = request.params

    const tag = await TagsRepository.findById(id)
    const recipes = await TagsRepository.findRecipes(id)

    response.json({ ...tag, recipes })
  }

  async store(request, response) {
    const { name, resume } = request.body
    const recipes = []
    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    const tag = await TagsRepository.create(name, resume, recipes)

    response.json(tag)
  }

  async update(request, response) {
    const { id } = request.params
    const { name, resume, recipes } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    const tag = await TagsRepository.update(id, { name, resume, recipes })

    response.json(tag)
  }

  async delete(request, response) {
    const { id } = request.params

    await TagsRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new TagController()
