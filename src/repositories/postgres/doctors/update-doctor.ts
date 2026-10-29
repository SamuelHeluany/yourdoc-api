import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

export interface UpdateDoctorParams {
    name?: string
    email?: string
    medical_area?: string
}

export class PostgresUpdateDoctorRepository {
    async execute(
        doctorId: string,
        updateDoctorParams: UpdateDoctorParams,
    ): Promise<Doctors> {
        return await prisma.doctors.update({
            where: {
                id: doctorId,
            },
            data: updateDoctorParams,
        })
    }
}
