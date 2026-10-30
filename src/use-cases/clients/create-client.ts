import { Clients } from '../../../generated/prisma/client.js'
import { EmailAlreadyInUseError } from '../../errors/client.js'
import { CreateClientParams } from '../../repositories/postgres/clients/create-client.js'
import { v4 as uuidv4 } from 'uuid'

interface CreateClientRepositoryParams {
    execute(client: Clients): Promise<Clients>
}

interface GetClientByEmailRepositoryProps {
    execute(email: string): Promise<Clients | null>
}

export class CreateClientUseCase {
    constructor(
        private readonly createClientRepository: CreateClientRepositoryParams,
        private readonly getClientByEmailRepository: GetClientByEmailRepositoryProps,
    ) {}
    async execute(createClientParams: CreateClientParams): Promise<Clients> {
        // verifica se o email ja existe
        const clientWithProviderEmail =
            await this.getClientByEmailRepository.execute(
                createClientParams.email,
            )
        // se existir, retorna erro
        if (clientWithProviderEmail) {
            throw new EmailAlreadyInUseError(createClientParams.email)
        }

        const clientId = uuidv4()

        const client = {
            ...createClientParams,
            id: clientId,
        }

        const createdClient = await this.createClientRepository.execute(client)

        return createdClient
    }
}
