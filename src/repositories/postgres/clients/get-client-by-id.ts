import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetClientByIdRepository {
    async execute(clientId: string): Promise<Clients | null> {
        return await prisma.clients.findUnique({
            where: {
                id: clientId,
            },
        })
    }
}
