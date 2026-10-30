import { v4 as uuidv4 } from 'uuid'
import { Clients, Consults, Doctors } from '../../../generated/prisma/client.js'
import { DoctorNotExistsError } from '../../errors/doctor.js'
import { ClientNotExistsError } from '../../errors/client.js'
import { CreateConsultParams } from '../../repositories/index.js'
// Create consult use case
interface GetClientByIdRepositoryProps {
    execute(clientId: string): Promise<Clients | null>
}

interface GetDoctorByIdRepositoryProps {
    execute(clientId: string): Promise<Doctors | null>
}

interface CreateConsultRepositoryProps {
    execute(createConsultParams: CreateConsultParams): Promise<Consults>
}

export class CreateConsultUseCase {
    constructor(
        private readonly getClientByIdRepository: GetClientByIdRepositoryProps,
        private readonly getDoctorByIdRepository: GetDoctorByIdRepositoryProps,
        private readonly createConsultRepository: CreateConsultRepositoryProps,
    ) {}
    async execute(createConsultParams: CreateConsultParams): Promise<Consults> {
        // pega o id do client
        const clientId = createConsultParams.client_id
        // verifica o id co client e passa um IF
        const client = await this.getClientByIdRepository.execute(clientId)

        if (!client) {
            throw new ClientNotExistsError(clientId)
        }
        // pega o id do doctor
        const doctorId = createConsultParams.doctor_id
        // verifica o id do doctor e passa um IF
        const doctor = await this.getDoctorByIdRepository.execute(doctorId)

        if (!doctor) {
            throw new DoctorNotExistsError(doctorId)
        }

        const consultId = uuidv4()

        const consult = await this.createConsultRepository.execute({
            ...createConsultParams,
            id: consultId,
        })

        return consult
    }
}
