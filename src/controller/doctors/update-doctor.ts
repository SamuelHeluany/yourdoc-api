import { ZodError } from 'zod'
import { Doctors } from '../../../generated/prisma/client.js'
import { UpdateDoctorRepositoryParams } from '../../repositories/index.js'
import { updateDoctorSchema } from '../../schemas/doctor.js'
import { badRequest, ok, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'

interface UpdateDoctorUseCaseProps {
    execute({
        doctorId,
        updateDoctorParams,
    }: UpdateDoctorRepositoryParams): Promise<Doctors>
}

export class UpdateDoctorController {
    constructor(
        private readonly updateDoctorUseCase: UpdateDoctorUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const doctorId = httpRequest.params?.doctorId

            if (!doctorId || !checkIfIdIsValid(doctorId)) {
                return invalidIdResponse()
            }

            const params = await updateDoctorSchema.parseAsync(httpRequest.body)

            const updateDoctor = await this.updateDoctorUseCase.execute({
                doctorId,
                updateDoctorParams: params,
            })

            return ok(updateDoctor)
        } catch (error) {
            // Se o error for uma instancia do zoderror, retorna bad request com o erro do zod
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid Resquest',
                })
            }
            // faz a comparação de que se o erro for uma instancia de EmailAlreadyInUseError, significa que esse erro foi emitido em alguma camada (no caso na use-case) e passa um badRequest com a mensagem do EmailAlreadyInUseError
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
