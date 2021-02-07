const db = require('../../database')

class RecipesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT recipes.*, categories.name as category_name, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN categories ON categories.id = recipes.category_id
      LEFT JOIN chefs ON chefs.id = recipes.chef_id
      ORDER BY title ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT recipes.*, categories.name AS category_name, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN categories ON categories.id = recipes.category_id
      LEFT JOIN chefs ON chefs.id = recipes.chef_id
      WHERE recipes.id = $1
    `,
      [id]
    )

    return row
  }

  async findByCategory(categoryId) {
    const rows = await db.query(
      `
      SELECT * FROM recipes
      WHERE category_id = $1
    `,
      [categoryId]
    )

    return rows
  }

  async create({
    title,
    ingredients,
    preparation,
    information,
    category_id,
    chef_id,
    tag_id,
    img_url,
    resume,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO recipes (title, ingredients, preparation, information, category_id, chef_id, tag_id, img_url, resume)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        title,
        ingredients,
        preparation,
        information,
        category_id,
        chef_id,
        tag_id,
        img_url,
        resume,
      ]
    )

    return row
  }

  async update(
    id,
    {
      title,
      ingredients,
      preparation,
      information,
      category_id,
      chef_id,
      tag_id,
      img_url,
      resume,
    }
  ) {
    const [row] = await db.query(
      `
      UPDATE recipes
      SET title = $1,
      ingredients = $2,
      preparation = $3,
      information = $4,
      category_id = $5,
      chef_id = $6,
      tag_id = $7,
      img_url = $8,
      resume = $9
      WHERE id = $10
      RETURNING *
    `,
      [
        title,
        ingredients,
        preparation,
        information,
        category_id,
        chef_id,
        tag_id,
        img_url,
        resume,
        id,
      ]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM recipes
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new RecipesRepository()
