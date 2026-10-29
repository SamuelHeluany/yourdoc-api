import { Doctors } from '../../../generated/prisma/client.js'
// get doctor by id use
interface GetDoctorByIdRepositoryProps {
    execute(doctorId: string): Promise<Doctors | null>
}

export class GetDoctorByIdUseCase {
    constructor(
        private readonly getDoctorByIdRepository: GetDoctorByIdRepositoryProps,
    ) {}

    async execute(doctorId: string): Promise<Doctors | null> {
        const doctor = await this.getDoctorByIdRepository.execute(doctorId)

        return doctor
    }
}
