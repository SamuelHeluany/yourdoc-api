import { Clients } from '../../../generated/prisma/client.js'
import {
    ClientNotExistsError,
    EmailAlreadyInUseError,
} from '../../errors/client.js'
import { UpdateClientRepositoryParams } from '../../repositories/index.js'

interface GetClientByIdRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

interface GetClientByEmailRepositoryProps {
    execute(email: string): Promise<Clients | null>
}

interface UpdateClientRepositoryProps {
    execute({
        clientId,
        updateClientParams,
    }: UpdateClientRepositoryParams): Promise<Clients>
}

export class UpdateClientUseCase {
    constructor(
        private readonly getClientByIdRepository: GetClientByIdRepositoryProps,
        private readonly getClientByEmailRepository: GetClientByEmailRepositoryProps,
        private readonly updateClientRepository: UpdateClientRepositoryProps,
    ) {}
    async execute({
        clientId,
        updateClientParams,
    }: UpdateClientRepositoryParams): Promise<Clients> {
        const userExists = await this.getClientByIdRepository.execute(clientId)

        if (!userExists) {
            throw new ClientNotExistsError(clientId)
        }

        if (updateClientParams.email) {
            // verifica se o email ja existe
            const clientWithProviderEmail =
                await this.getClientByEmailRepository.execute(
                    updateClientParams.email,
                )
            // se existir, retorna erro
            if (clientWithProviderEmail) {
                throw new EmailAlreadyInUseError(updateClientParams.email)
            }
        }

        const client = {
            ...updateClientParams,
        }

        const updateClient = await this.updateClientRepository.execute({
            clientId,
            updateClientParams: client,
        })

        return updateClient
    }
}
