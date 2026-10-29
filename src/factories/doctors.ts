import {
    CreateDoctorController,
    DeleteDoctorController,
    GetDoctorByIdController,
} from '../controller/index.js'
import {
    PostgresCreateDoctorRepository,
    PostgresDeleteDoctorRepository,
    PostgresGetDoctorByEmailRepository,
    PostgresGetDoctorByIdRepository,
} from '../repositories/index.js'
import {
    CreateDoctorUseCase,
    DeleteDoctorUseCase,
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

export const makeDeleteDoctorController = () => {
    const deleteDoctorRepository = new PostgresDeleteDoctorRepository()

    const deleteDoctorUseCase = new DeleteDoctorUseCase(deleteDoctorRepository)

    const deleteDoctorController = new DeleteDoctorController(
        deleteDoctorUseCase,
    )

    return deleteDoctorController
}
