const ChefsRepository = require('../repositories/ChefsRepository')

class ChefController {
  async index(request, response) {
    const { orderBy } = request.query

    const chefs = await ChefsRepository.findAll(orderBy)

    response.json(chefs)
  }

  store() {

  }

  show() {

  }

  update() {

  }

  delete() {

  }
}

module.exports = new ChefController()
