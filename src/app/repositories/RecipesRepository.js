const db = require('../../database')

class RecipesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT * FROM recipes
      ORDER BY title ${direction}
    `)

    return rows
  }
}

module.exports = new RecipesRepository()
