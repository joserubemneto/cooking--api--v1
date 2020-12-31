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

  show() {

  }

  update() {

  }

  delete() {

  }
}

module.exports = new ChefController()
