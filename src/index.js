const express = require('express')
require('express-async-errors')
require('dotenv').config()

const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(routes)
app.use((error, request, response, next) => {
  console.log(error)
  response.sendStatus(500)
})

app.listen(process.env.PORT || 3000, () => console.log('Server is running on port http://localhost:3000'))
