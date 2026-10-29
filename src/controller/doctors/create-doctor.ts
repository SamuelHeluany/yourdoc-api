import { ZodError } from 'zod'
import { Doctors } from '../../../generated/prisma/client.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { CreateDoctorParams } from '../../repositories/index.js'
import { createDoctorSchema } from '../../schemas/doctor.js'
import { badRequest, created, serverError } from '../helpers/http.js'
import { HttpRequest, HttpResponse } from '../types.js'
// create doctor controller
interface CreateDoctorUseCaseProps {
    execute(createDoctorParams: CreateDoctorParams): Promise<Doctors>
}

export class CreateDoctorController {
    constructor(
        private readonly createDoctorUseCase: CreateDoctorUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = httpRequest.body as CreateDoctorParams

            await createDoctorSchema.parseAsync(params)

            const createdDoctor = await this.createDoctorUseCase.execute(params)

            return created(createdDoctor)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid request.',
                })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
