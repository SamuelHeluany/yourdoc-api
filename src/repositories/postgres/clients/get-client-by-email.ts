import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetClientByEmailRepository {
    async execute(email: string): Promise<Clients | null> {
        return await prisma.clients.findUnique({
            where: {
                email,
            },
        })
    }
}
