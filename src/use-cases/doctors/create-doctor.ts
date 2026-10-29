import { v4 as uuidv4 } from 'uuid'
import { Doctors } from '../../../generated/prisma/client.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { CreateDoctorParams } from '../../repositories/index.js'

// create doctor use case

interface GetDoctorByEmailProps {
    execute(email: string): Promise<Doctors | null>
}

interface CreateDoctorRepositoryProps {
    execute(createDoctorParams: CreateDoctorParams): Promise<Doctors>
}

export class CreateDoctorUseCase {
    constructor(
        private readonly getDoctorByEmail: GetDoctorByEmailProps,
        private readonly createDoctorRepository: CreateDoctorRepositoryProps,
    ) {}
    async execute(createDoctorParams: CreateDoctorParams): Promise<Doctors> {
        const doctorWithProviderEmail = await this.getDoctorByEmail.execute(
            createDoctorParams.email,
        )

        if (doctorWithProviderEmail) {
            throw new EmailAlreadyInUseError(createDoctorParams.email)
        }

        const doctorId = uuidv4()

        const doctor = {
            ...createDoctorParams,
            id: doctorId,
        }

        const createdDoctor = await this.createDoctorRepository.execute(doctor)

        return createdDoctor
    }
}
