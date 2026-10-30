import 'dotenv/config'
import express from 'express'
import {
    makeCreateClientController,
    makeDeleteClientController,
    makeGetClientByIdController,
    makeUpdateClientController,
} from './src/factories/client.js'
import {
    makeCreateDoctorController,
    makeDeleteDoctorController,
    makeGetDoctorByIdController,
    makeUpdateDoctorController,
} from './src/factories/doctors.js'
import { makeCreateConsultController } from './src/factories/consult.js'

const app = express()
app.use(express.json())

// CLIENT

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

// DOCTOR

// Create Doctor
app.post('/api/doctors', async (req, res) => {
    const createDoctorController = makeCreateDoctorController()
    const { statusCode, body } = await createDoctorController.execute(req)
    res.status(statusCode).send(body)
})

// get doctor by id
app.get('/api/doctors/:doctorId', async (req, res) => {
    const getDoctorByIdController = makeGetDoctorByIdController()
    const { statusCode, body } = await getDoctorByIdController.execute(req)
    res.status(statusCode).send(body)
})

// delete doctor by id
app.delete('/api/doctors/:doctorId', async (req, res) => {
    const deleteDoctorController = makeDeleteDoctorController()
    const { statusCode, body } = await deleteDoctorController.execute(req)
    res.status(statusCode).send(body)
})

// update doctor
app.patch('/api/doctors/:doctorId', async (req, res) => {
    const updateDoctorController = makeUpdateDoctorController()
    const { statusCode, body } = await updateDoctorController.execute(req)
    res.status(statusCode).send(body)
})

// CONSULT

app.post('/api/consults', async (req, res) => {
    const createConsultController = makeCreateConsultController()
    const { statusCode, body } = await createConsultController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
