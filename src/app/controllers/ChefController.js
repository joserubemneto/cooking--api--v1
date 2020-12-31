const ChefsRepository = require('../repositories/ChefsRepository')

class ChefController {
  async index(request, response) {
    const { orderBy } = request.query

    const chefs = await ChefsRepository.findAll(orderBy)

    response.json(chefs)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) return response.status(400).json({ error: 'Name is required' })

    const chef = await ChefsRepository.create({ name })

    response.json(chef)
  }

  async show(request, response) {
    const { id } = request.params

    const chef = await ChefsRepository.findById(id)

    if (!chef) return response.status(404).json({ error: 'Chef not found' })

    response.json(chef)
  }

  update() {

  }

  delete() {

  }
}

module.exports = new ChefController()
