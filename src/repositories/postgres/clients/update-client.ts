import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

interface UpdateClientParamsProps {
    first_name?: string
    last_name?: string
    email?: string
    phon_number?: string
}

interface UpdateClientRepositoryParams {
    clientId: string
    updateClientParams: UpdateClientParamsProps
}

export class PostgresUpdateClientRepository {
    async execute({
        clientId,
        updateClientParams,
    }: UpdateClientRepositoryParams): Promise<Clients> {
        return await prisma.clients.update({
            where: {
                id: clientId,
            },
            data: updateClientParams,
        })
    }
}
