import { CreateConsultController } from '../controller/index.js'
import {
    PostgresCreateConsultRepository,
    PostgresGetClientByIdRepository,
    PostgresGetDoctorByIdRepository,
} from '../repositories/index.js'
import { CreateConsultUseCase } from '../use-cases/index.js'

export const makeCreateConsultController = () => {
    const getClientByIdRepository = new PostgresGetClientByIdRepository()
    const getDoctorByIdRepository = new PostgresGetDoctorByIdRepository()
    const createConsultRepository = new PostgresCreateConsultRepository()

    const createConsultUseCase = new CreateConsultUseCase(
        getClientByIdRepository,
        getDoctorByIdRepository,
        createConsultRepository,
    )

    const createConsultController = new CreateConsultController(
        createConsultUseCase,
    )

    return createConsultController
}
