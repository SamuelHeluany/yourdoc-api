import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

// get doctor by id
export class PostgresGetDoctorByIdRepository {
    async execute(doctorId: string): Promise<Doctors | null> {
        return await prisma.doctors.findUnique({
            where: {
                id: doctorId,
            },
        })
    }
}
