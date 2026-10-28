import { Clients } from '../../../generated/prisma/client.js'

interface DeleteClientRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

export class DeleteClientUseCase {
    constructor(
        private readonly deleteClientRepository: DeleteClientRepositoryProps,
    ) {}
    async execute(clientId: string): Promise<Clients | null> {
        const deletedClient =
            await this.deleteClientRepository.execute(clientId)
        return deletedClient
    }
}
