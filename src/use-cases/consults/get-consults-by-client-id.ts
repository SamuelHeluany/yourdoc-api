import { Clients, Consults } from '../../../generated/prisma/client.js'
import { ClientNotExistsError } from '../../errors/user.js'

interface GetClientByIdRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

interface GetConsultsByClientIdRepositoryProps {
    execute(clientId: string): Promise<Consults[]>
}

interface GetConsultsByClientIdParams {
    clientId: string
}

export class GetConsultsByClientIdUseCase {
    constructor(
        private readonly getClientByIdRepository: GetClientByIdRepositoryProps,
        private readonly getConsultsByClientIdRepository: GetConsultsByClientIdRepositoryProps,
    ) {}
    async execute(params: GetConsultsByClientIdParams): Promise<Consults[]> {
        const clientId = params.clientId

        const client = await this.getClientByIdRepository.execute(clientId)

        if (!client) {
            throw new ClientNotExistsError(clientId)
        }

        const consults =
            await this.getConsultsByClientIdRepository.execute(clientId)

        return consults
    }
}
