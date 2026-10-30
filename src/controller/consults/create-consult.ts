import { ZodError } from 'zod'
import { Consults } from '../../../generated/prisma/client.js'
import { CreateConsultParams } from '../../repositories/index.js'
import { createConsultSchema } from '../../schemas/consults.js'
import { badRequest, created, serverError } from '../helpers/http.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface CreateConsultUseCaseProps {
    execute(createConsultParams: CreateConsultParams): Promise<Consults>
}

export class CreateConsultController {
    constructor(
        private readonly createConsultUseCase: CreateConsultUseCaseProps,
    ) {}
    async execute(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = HttpRequest.body as CreateConsultParams

            await createConsultSchema.parseAsync(params)

            const createdConsult =
                await this.createConsultUseCase.execute(params)

            return created(createdConsult)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid Request',
                })
            }

            console.error(error)
            return serverError()
        }
    }
}
