import { Doctors } from '../../../generated/prisma/client.js'
import { doctorNotFoundResponse } from '../helpers/doctor.js'
import { ok, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface GetDoctorByIdUseCaseProps {
    execute(doctorId: string): Promise<Doctors | null>
}

export class GetDoctorByIdController {
    constructor(
        private readonly getDoctorByIdUseCase: GetDoctorByIdUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const doctorId = httpRequest.params?.doctorId

            if (!doctorId || !checkIfIdIsValid(doctorId)) {
                return invalidIdResponse()
            }

            const doctor = await this.getDoctorByIdUseCase.execute(doctorId)

            if (!doctor) {
                return doctorNotFoundResponse()
            }

            return ok(doctor)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
