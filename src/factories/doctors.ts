import { CreateDoctorController } from '../controller/index.js'
import {
    PostgresCreateDoctorRepository,
    PostgresGetDoctorByEmailRepository,
} from '../repositories/index.js'
import { CreateDoctorUseCase } from '../use-cases/index.js'

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
