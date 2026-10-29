import {
    CreateDoctorController,
    GetDoctorByIdController,
} from '../controller/index.js'
import {
    PostgresCreateDoctorRepository,
    PostgresGetDoctorByEmailRepository,
    PostgresGetDoctorByIdRepository,
} from '../repositories/index.js'
import {
    CreateDoctorUseCase,
    GetDoctorByIdUseCase,
} from '../use-cases/index.js'

export const makeCreateDoctorController = () => {
    const getDoctorByEmailRepository = new PostgresGetDoctorByEmailRepository()
    const createDoctorRepository = new PostgresCreateDoctorRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(
        getDoctorByEmailRepository,
        createDoctorRepository,
    )

    const createDoctorController = new CreateDoctorController(
        createDoctorUseCase,
    )

    return createDoctorController
}

export const makeGetDoctorByIdController = () => {
    const getDoctorByIdRepository = new PostgresGetDoctorByIdRepository()

    const getDoctorByIdUseCase = new GetDoctorByIdUseCase(
        getDoctorByIdRepository,
    )

    const getDoctorByIdController = new GetDoctorByIdController(
        getDoctorByIdUseCase,
    )

    return getDoctorByIdController
}
