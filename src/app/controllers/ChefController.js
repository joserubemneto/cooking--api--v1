const ChefsRepository = require('../repositories/ChefsRepository')

class ChefController {
  async index(request, response) {
    const { orderBy } = request.query

    const chefs = await ChefsRepository.findAll(orderBy)

    response.json(chefs)
  }

  async store(request, response) {
    const { name, resume, img_url } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })

    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    if (!img_url)
      return response.status(400).json({ error: 'Image is required' })

    const chef = await ChefsRepository.create({ name, resume, img_url })

    response.json(chef)
  }

  async show(request, response) {
    const { id } = request.params

    const chef = await ChefsRepository.findById(id)
    const recipes = await ChefsRepository.findRecipes(id)

    if (!chef) return response.status(404).json({ error: 'Chef not found' })

    response.json({ ...chef, recipes })
  }

  async update(request, response) {
    const { id } = request.params
    const { name, resume, img_url } = request.body

    const chefExists = await ChefsRepository.findById(id)

    if (!chefExists)
      return response.status(400).json({ error: 'This chef not exists' })
    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    if (!img_url)
      return response.status(400).json({ error: 'Image is required' })

    const chef = await ChefsRepository.update(id, { name, resume, img_url })

    response.json(chef)
  }

  async delete(request, response) {
    const { id } = request.params

    await ChefsRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new ChefController()
