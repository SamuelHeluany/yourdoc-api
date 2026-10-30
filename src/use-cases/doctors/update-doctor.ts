import { Doctors } from '../../../generated/prisma/client.js'
import { DoctorNotExistsError } from '../../errors/doctor.js'
import { EmailAlreadyInUseError } from '../../errors/client.js'
import { UpdateDoctorRepositoryParams } from '../../repositories/index.js'

interface GetDoctorByIdRepositoryProps {
    execute(doctorId: string): Promise<Doctors | null>
}

interface GetDoctorByEmailProps {
    execute(email: string): Promise<Doctors | null>
}

interface UpdateDoctorRepositoryProps {
    execute({
        doctorId,
        updateDoctorParams,
    }: UpdateDoctorRepositoryParams): Promise<Doctors>
}

export class UpdateDoctorUseCase {
    constructor(
        private readonly getDoctorByIdRepository: GetDoctorByIdRepositoryProps,
        private readonly getDoctorByEmailRepository: GetDoctorByEmailProps,
        private readonly updateDoctorRepository: UpdateDoctorRepositoryProps,
    ) {}
    async execute({
        doctorId,
        updateDoctorParams,
    }: UpdateDoctorRepositoryParams): Promise<Doctors> {
        const doctorExists =
            await this.getDoctorByIdRepository.execute(doctorId)

        if (!doctorExists) {
            throw new DoctorNotExistsError(doctorId)
        }

        if (updateDoctorParams.email) {
            const doctorWithProvideEmail =
                await this.getDoctorByEmailRepository.execute(
                    updateDoctorParams.email,
                )
            if (doctorWithProvideEmail) {
                throw new EmailAlreadyInUseError(updateDoctorParams.email)
            }
        }

        const doctor = {
            ...updateDoctorParams,
        }

        const updateDoctor = await this.updateDoctorRepository.execute({
            doctorId,
            updateDoctorParams: doctor,
        })

        return updateDoctor
    }
}
