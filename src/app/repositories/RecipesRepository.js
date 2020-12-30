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

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM recipes
      WHERE id = $1
    `, [id])

    return row
  }
}

module.exports = new RecipesRepository()
