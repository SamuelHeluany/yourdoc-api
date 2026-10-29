import { Doctors } from '../../../generated/prisma/client.js'
// delete doctor use case
interface DeleteDoctorRepositoryProps {
    execute(doctorId: string): Promise<Doctors | null>
}

export class DeleteDoctorUseCase {
    constructor(
        private readonly deleteDoctorRepository: DeleteDoctorRepositoryProps,
    ) {}
    async execute(doctorId: string): Promise<Doctors | null> {
        const deleteDoctor = await this.deleteDoctorRepository.execute(doctorId)
        return deleteDoctor
    }
}
