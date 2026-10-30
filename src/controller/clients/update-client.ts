import { ZodError } from 'zod'
import { Clients } from '../../../generated/prisma/client.js'
import { UpdateClientRepositoryParams } from '../../repositories/index.js'
import { updateClientSchema } from '../../schemas/client.js'
import { badRequest, ok, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js'
import { HttpRequest, HttpResponse } from '../types.js'
import {
    ClientNotExistsError,
    EmailAlreadyInUseError,
} from '../../errors/client.js'

interface updateClientUseCaseProps {
    execute({
        clientId,
        updateClientParams,
    }: UpdateClientRepositoryParams): Promise<Clients>
}

export class UpdateClientController {
    constructor(
        private readonly updateClientUseCase: updateClientUseCaseProps,
    ) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const clientId = httpRequest.params?.clientId

            if (!clientId || !checkIfIdIsValid(clientId)) {
                return invalidIdResponse()
            }

            const params = await updateClientSchema.parseAsync(httpRequest.body)

            const updatedClient = await this.updateClientUseCase.execute({
                clientId,
                updateClientParams: params,
            })

            return ok(updatedClient)
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

            if (error instanceof ClientNotExistsError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
