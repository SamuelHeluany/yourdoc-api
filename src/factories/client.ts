import { CreateClientController } from '../controller/index.js'
import {
    PostgresCreateClientRepository,
    PostgresGetClientByEmailRepository,
} from '../repositories/index.js'
import { CreateClientUseCase } from '../use-cases/index.js'

export const makeCreateClientController = () => {
    const createClientRepository = new PostgresCreateClientRepository()
    const getClientByEmailRepository = new PostgresGetClientByEmailRepository()

    const createClientUseCase = new CreateClientUseCase(
        createClientRepository,
        getClientByEmailRepository,
    )

    const createClientController = new CreateClientController(
        createClientUseCase,
    )

    return createClientController
}
