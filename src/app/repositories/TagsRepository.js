const db = require('../../database')

class TagsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * from tags
    `)

    const recipes = await db.query(`
      SELECT * from recipes
    `)

    rows.map((tag, index) => {
      recipes.map(recipe => {
        if (recipe.tag_id[index] === tag.id) {
          tag.recipes.push(recipe)
        }
      })
    })

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
        SELECT * FROM tags
        WHERE id = $1
      `,
      [id]
    )

    return row
  }

  async findRecipes(tagId) {
    const recipes = []
    const rows = await db.query(
      `
      SELECT * from recipes
    `
    )
    rows.map((recipe, index) => {
      recipe.tag_id[index] === tagId
      recipes.push(recipe)
    })
    return recipes
  }

  async create(name, recipes) {
    const [row] = await db.query(
      `
      INSERT INTO tags (name, recipes)
      VALUES ($1, $2)
      RETURNING *
    `,
      [name, recipes]
    )

    return row
  }

  async update(id, { name, recipes }) {
    const [row] = await db.query(
      `
      UPDATE tags
      SET name = $1,
      recipes = $2
      WHERE id = $3
      RETURNING *
    `,
      [name, recipes, id]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM tags
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new TagsRepository()
