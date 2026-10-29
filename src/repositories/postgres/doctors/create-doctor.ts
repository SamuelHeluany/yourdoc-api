import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export interface CreateDoctorParams {
    name: string
    email: string
    medical_area: string
}

export class PostgresCreateDoctorRepository {
    async execute(createDoctorParams: CreateDoctorParams): Promise<Doctors> {
        return await prisma.doctors.create({
            data: createDoctorParams,
        })
    }
}
