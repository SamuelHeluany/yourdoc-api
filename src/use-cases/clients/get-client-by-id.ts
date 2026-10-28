import { Clients } from '../../../generated/prisma/client.js'

interface GetClientsByIdRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

export class GetClientByIdUseCase {
    constructor(
        private readonly getClientByIdRepository: GetClientsByIdRepositoryProps,
    ) {}
    async execute(clientId: string): Promise<Clients | null> {
        const client = await this.getClientByIdRepository.execute(clientId)

        return client
    }
}
