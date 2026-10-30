import { Clients } from '../../../generated/prisma/client.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'
import { ok, serverError } from '../helpers/http.js'
import { clientNotFoundResponse } from '../helpers/client.js'

interface GetClientByIdUseCaseProps {
    execute(clientId: string): Promise<Clients | null>
}

export class GetClientByIdController {
    constructor(
        private readonly getClientByIdUseCase: GetClientByIdUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const clientId = httpRequest.params?.clientId

            if (!clientId || !checkIfIdIsValid(clientId)) {
                return invalidIdResponse()
            }

            const client = await this.getClientByIdUseCase.execute(clientId)

            if (!client) {
                return clientNotFoundResponse()
            }

            return ok(client)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
