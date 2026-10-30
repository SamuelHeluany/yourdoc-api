import { Clients } from '../../../generated/prisma/client.js'
import { ok, serverError } from '../helpers/http.js'
import { clientNotFoundResponse } from '../helpers/client.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'

// delete client controller

interface DeleteClientUseCaseProps {
    execute(clientId: string): Promise<Clients | null>
}

export class DeleteClientController {
    constructor(
        private readonly deleteClientUseCase: DeleteClientUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const clientId = httpRequest.params?.clientId

            if (!clientId || !checkIfIdIsValid(clientId)) {
                return invalidIdResponse()
            }

            const deletedClient =
                await this.deleteClientUseCase.execute(clientId)
            if (!deletedClient) {
                return clientNotFoundResponse()
            }

            return ok(deletedClient)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
