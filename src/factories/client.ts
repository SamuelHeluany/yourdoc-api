import {
    CreateClientController,
    DeleteClientController,
    GetClientByIdController,
} from '../controller/index.js'
import {
    PostgresCreateClientRepository,
    PostgresDeleteClientRepository,
    PostgresGetClientByEmailRepository,
    PostgresGetClientByIdRepository,
} from '../repositories/index.js'
import {
    CreateClientUseCase,
    DeleteClientUseCase,
    GetClientByIdUseCase,
} from '../use-cases/index.js'

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

export const makeGetClientByIdController = () => {
    const getClientByIdRepository = new PostgresGetClientByIdRepository()

    const getClientByIdUseCase = new GetClientByIdUseCase(
        getClientByIdRepository,
    )

    const getClientByIdController = new GetClientByIdController(
        getClientByIdUseCase,
    )

    return getClientByIdController
}

export const makeDeleteClientController = () => {
    const deleteClientRepository = new PostgresDeleteClientRepository()

    const deleteClientUseCase = new DeleteClientUseCase(deleteClientRepository)

    const deleteClientController = new DeleteClientController(
        deleteClientUseCase,
    )

    return deleteClientController
}
