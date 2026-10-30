import { Consults } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetConsultByClientIdRepository {
    async execute(clientId: string): Promise<Consults[]> {
        return await prisma.consults.findMany({
            where: {
                client_id: clientId,
            },
        })
    }
}
