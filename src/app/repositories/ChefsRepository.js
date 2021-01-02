const db = require('../../database')

class ChefsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT chefs.*, count(recipes.id) AS recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY (chefs.id, chefs.name, chefs.recipes)
      ORDER BY name ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT chefs.*, count(recipes.id) AS recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY (chefs.id, chefs.name, chefs.recipes)
    `, [id])

    return row
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO chefs (name)
      VALUES ($1)
      RETURNING *
    `, [name])

    return row
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE chefs
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id])

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM chefs
      WHERE id = $1
    `, [id])

    return deleteOp
  }
}

module.exports = new ChefsRepository()
