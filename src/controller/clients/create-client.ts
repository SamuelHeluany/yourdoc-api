import { ZodError } from 'zod'
import { Clients } from '../../../generated/prisma/client.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { CreateClientParams } from '../../repositories/postgres/clients/create-client.js'
import { createClientSchema } from '../../schemas/client.js'
import { badRequest, created, serverError } from '../helpers/http.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface CreateClientUseCase {
    execute(client: Clients): Promise<Clients>
}

export class CreateClientController {
    constructor(private readonly createClientUseCase: CreateClientUseCase) {}

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = httpRequest.body as CreateClientParams
            // verifica com zod os campos do body
            await createClientSchema.parseAsync(params)
            // cria o client
            const createClient = await this.createClientUseCase.execute(params)
            // retorna o client
            return created(createClient)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0]?.message ?? 'Invalid Request.',
                })
            }
            // se o erro for uma instancia do erro de email do usecase, retorna bad request
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
