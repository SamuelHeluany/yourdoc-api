import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteClientRepository {
    async execute(clientId: string): Promise<Clients | null> {
        try {
            return await prisma.clients.delete({
                where: {
                    id: clientId,
                },
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
