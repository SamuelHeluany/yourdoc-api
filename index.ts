import 'dotenv/config'
import express from 'express'
import {
    makeCreateClientController,
    makeDeleteClientController,
    makeGetClientByIdController,
    makeUpdateClientController,
} from './src/factories/client.js'

const app = express()
app.use(express.json())

// get clients by id
app.get('/api/clients/:clientId', async (req, res) => {
    const getClientByIdController = makeGetClientByIdController()
    const { statusCode, body } = await getClientByIdController.execute(req)
    res.status(statusCode).send(body)
})

// create client
app.post('/api/clients', async (req, res) => {
    const createClientController = makeCreateClientController()
    const { statusCode, body } = await createClientController.execute(req)
    res.status(statusCode).send(body)
})

// update client
app.patch('/api/clients/:clientId', async (req, res) => {
    const updateClientController = makeUpdateClientController()
    const { statusCode, body } = await updateClientController.execute(req)
    res.status(statusCode).send(body)
})

// delete client
app.delete('/api/clients/:clientId', async (req, res) => {
    const deleteClientController = makeDeleteClientController()
    const { statusCode, body } = await deleteClientController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
