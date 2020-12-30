const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query

    const categories = await CategoriesRepository.findAll(orderBy)

    response.json(categories)
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

module.exports = new CategoryController()
