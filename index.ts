import 'dotenv/config'
import express from 'express'
import { makeCreateClientController } from './src/factories/client.js'

const app = express()
app.use(express.json())

app.post('/api/clients', async (req, res) => {
    const createClientController = makeCreateClientController()
    const { statusCode, body } = await createClientController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
