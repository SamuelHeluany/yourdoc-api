import { Clients } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export interface CreateClientParams {
    id: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
}

export class PostgresCreateClientRepository {
    async execute(createClientParams: CreateClientParams): Promise<Clients> {
        return await prisma.clients.create({
            data: createClientParams,
        })
    }
}
