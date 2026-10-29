import { Doctors } from '../../../../generated/prisma/client.js'
import { prisma } from '../../../../prisma/prisma.js'
// delete client repository
export class PostgresDeleteDoctorRepository {
    async execute(doctorId: string): Promise<Doctors | null> {
        try {
            return await prisma.doctors.delete({
                where: {
                    id: doctorId,
                },
            })
        } catch (error) {
            console.error(error)
            // retorna nulo para pegar o erro de DoctorNotExistsError
            return null
        }
    }
}
