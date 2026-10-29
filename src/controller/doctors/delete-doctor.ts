import { Doctors } from '../../../generated/prisma/client.js'
import { doctorNotFoundResponse } from '../helpers/doctor.js'
import { ok, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface DeleteDoctorUseCaseProps {
    execute(doctorId: string): Promise<Doctors | null>
}

export class DeleteDoctorController {
    constructor(
        private readonly deleteDoctorUseCase: DeleteDoctorUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const doctorId = httpRequest.params?.doctorId

            if (!doctorId || !checkIfIdIsValid(doctorId)) {
                return invalidIdResponse()
            }

            const deletedDoctor =
                await this.deleteDoctorUseCase.execute(doctorId)

            if (!deletedDoctor) {
                return doctorNotFoundResponse()
            }

            return ok(deletedDoctor)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
