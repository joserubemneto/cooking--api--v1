const ChefsRepository = require('../repositories/ChefsRepository')
const FilesRepository = require('../repositories/FilesRepository')

class ChefController {
  async index(request, response) {
    const { orderBy } = request.query

    let chefs = await ChefsRepository.findAll(orderBy)

    const chefsTemp = await Promise.all(
      chefs.map(async (chef) => {
        const file = await FilesRepository.find(chef.file_id)

        return {
          ...chef,
          avatar_url: `${request.protocol}://${
            request.headers.host
          }${file.path.replace('public', '')}`,
        }
      })
    )

    chefs = chefsTemp

    response.json(chefs)
  }

  async store(request, response) {
    const { name, resume } = request.body

    if (!request.file)
      return response.status(400).json({ error: 'Send at least one image' })

    if (!name) return response.status(400).json({ error: 'Name is required' })

    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    const file = await FilesRepository.create(request.file)
    if (!file) return response.status(400).json({ error: 'O erro é nos files' })

    const chef = await ChefsRepository.create({
      name,
      resume,
      file_id: file.id,
    })

    response.json(chef)
  }

  async show(request, response) {
    const { id } = request.params

    let chef = await ChefsRepository.findById(id)
    const recipes = await ChefsRepository.findRecipes(id)

    if (!chef) return response.status(404).json({ error: 'Chef not found' })

    const file = await FilesRepository.find(chef.file_id)

    chef = {
      ...chef,
      avatar_url: `${request.protocol}://${
        request.headers.host
      }${file.path.replace('public', '')}`,
    }

    response.json({ ...chef, recipes })
  }

  async update(request, response) {
    const { id } = request.params
    const { name, resume } = request.body

    const chefExists = await ChefsRepository.findById(id)

    if (!chefExists)
      return response.status(400).json({ error: 'This chef not exists' })
    if (!name) return response.status(400).json({ error: 'Name is required' })
    if (!resume)
      return response.status(400).json({ error: 'Resume is required' })

    const chef = await ChefsRepository.update(id, { name, resume })

    response.json(chef)
  }

  async delete(request, response) {
    const { id } = request.params

    const result = await ChefsRepository.findById(id)

    await FilesRepository.delete(result.file_id)

    await ChefsRepository.delete(id)

    response.sendStatus(200)
  }
}

module.exports = new ChefController()
