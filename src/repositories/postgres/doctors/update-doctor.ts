import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'

interface UpdateDoctorParamsProps {
    name?: string
    email?: string
    medical_area?: string
}

export interface UpdateDoctorRepositoryParams {
    doctorId: string
    updateDoctorParams: UpdateDoctorParamsProps
}

export class PostgresUpdateDoctorRepository {
    async execute({
        doctorId,
        updateDoctorParams,
    }: UpdateDoctorRepositoryParams): Promise<Doctors> {
        return await prisma.doctors.update({
            where: {
                id: doctorId,
            },
            data: updateDoctorParams,
        })
    }
}
