import { Clients } from '../../../generated/prisma/client.js'
import { CreateClientParams } from '../../repositories/postgres/clients/create-client.js'
import { v4 as uuidv4 } from 'uuid'

interface CreateClientRepositoryParams {
    execute(client: Clients): Promise<Clients>
}

export class CreateClientUseCase {
    constructor(
        private readonly createClientRepository: CreateClientRepositoryParams,
    ) {}
    async execute(createClientParams: CreateClientParams): Promise<Clients> {
        const clientId = uuidv4()

        const client = {
            ...createClientParams,
            id: clientId,
        }

        const createdClient = await this.createClientRepository.execute(client)

        return createdClient
    }
}
