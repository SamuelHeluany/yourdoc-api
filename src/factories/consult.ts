import { GetConsultsByClientIdController } from '../controller/consults/get-consults-by-client-id.js'
import { CreateConsultController } from '../controller/index.js'
import {
    PostgresCreateConsultRepository,
    PostgresGetClientByIdRepository,
    PostgresGetConsultByClientIdRepository,
    PostgresGetDoctorByIdRepository,
} from '../repositories/index.js'
import {
    CreateConsultUseCase,
    GetConsultsByClientIdUseCase,
} from '../use-cases/index.js'

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

export const makeGetConsultsByClientIdController = () => {
    const getClientByIdRepository = new PostgresGetClientByIdRepository()
    const getConsultsByClientIdRepository =
        new PostgresGetConsultByClientIdRepository()

    const getConsultsByClientIdUseCase = new GetConsultsByClientIdUseCase(
        getClientByIdRepository,
        getConsultsByClientIdRepository,
    )

    const getConsultsByClientIdController = new GetConsultsByClientIdController(
        getConsultsByClientIdUseCase,
    )

    return getConsultsByClientIdController
}
