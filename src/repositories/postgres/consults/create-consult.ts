import { Consults } from '../../../../generated/prisma/client.js'
import { ConsultStatus } from '../../../../generated/prisma/enums.js'
import { prisma } from '../../../../prisma/prisma.js'

export interface CreateConsultParams {
    id: string
    client_id: string
    doctor_id: string
    date: Date
    status: ConsultStatus
}

export class PostgresCreateConsultRepository {
    async execute(createConsultParams: CreateConsultParams): Promise<Consults> {
        return await prisma.consults.create({
            data: createConsultParams,
        })
    }
}
