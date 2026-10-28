import { Clients } from '../../../generated/prisma/client.js'

interface DeleteClientRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

export class DeleteClientUseCase {
    constructor(
        private readonly deleteClientRepository: DeleteClientRepositoryProps,
    ) {}
    async execute(clientId: string): Promise<Clients | null> {
        const deletedUser = await this.deleteClientRepository.execute(clientId)
        return deletedUser
    }
}
