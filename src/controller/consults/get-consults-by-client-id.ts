import { Consults } from '../../../generated/prisma/client.js'
import { ClientNotExistsError } from '../../errors/client.js'
import { GetConsultsByClientIdParams } from '../../use-cases/index.js'
import { badRequest, ok, serverError } from '../helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldMissingResponse,
} from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface GetConsultsByClientIdUseCaseProps {
    execute(params: GetConsultsByClientIdParams): Promise<Consults[]>
}

export class GetConsultsByClientIdController {
    constructor(
        private readonly getConsultsByClientIdUseCase: GetConsultsByClientIdUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const clientId = httpRequest.query?.clientId

            if (!clientId) {
                return requiredFieldMissingResponse('clientId')
            }

            if (typeof clientId !== 'string' || !checkIfIdIsValid(clientId)) {
                return invalidIdResponse()
            }

            const consults = await this.getConsultsByClientIdUseCase.execute({
                clientId,
            })

            return ok(consults)
        } catch (error) {
            if (error instanceof ClientNotExistsError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
