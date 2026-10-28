import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteClientRepository {
    async execute(clientId: string): Promise<Clients | null> {
        return await prisma.clients.delete({
            where: {
                id: clientId,
            },
        })
    }
}
