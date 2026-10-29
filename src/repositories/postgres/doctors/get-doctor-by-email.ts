import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

// get doctor by email

export class PostgresGetDoctorByEmailRepository {
    async execute(email: string): Promise<Doctors | null> {
        return await prisma.doctors.findUnique({
            where: {
                email,
            },
        })
    }
}
