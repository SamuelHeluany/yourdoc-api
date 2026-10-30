import { ConsultStatus } from '../../../../generated/prisma/enums.js'
import { prisma } from '../../../../prisma/prisma.js'

interface CreateConsultParams {
    id: string
    client_id: string
    doctor_id: string
    date: Date
    status: ConsultStatus
}

export class PostgresCreateConsultRepository {
    async execute(createConsultParams: CreateConsultParams) {
        return await prisma.consults.create({
            data: createConsultParams,
        })
    }
}
