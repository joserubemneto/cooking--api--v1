const db = require('../../database')

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const rows = await db.query(`
      SELECT * FROM categories
      ORDER BY name ${direction}
    `)

    return rows
  }

  findByName() {

  }

  create() {

  }

  update() {

  }

  delete() {

  }
}

module.exports = new CategoriesRepository()
