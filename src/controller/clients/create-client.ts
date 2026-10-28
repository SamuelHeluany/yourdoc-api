import { Clients } from '../../../generated/prisma/client.js'
import { CreateClientParams } from '../../repositories/postgres/clients/create-client.js'
import { createClientSchema } from '../../schemas/client.js'
import { created, serverError } from '../helpers/http.js'
import { HttpRequest, HttpResponse } from '../types.js'

interface CreateClientUseCase {
    execute(client: Clients): Promise<Clients>
}

export class CreateClientController {
    constructor(private readonly createClientUseCase: CreateClientUseCase) {}
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params = httpRequest.body as CreateClientParams

            await createClientSchema.parseAsync(params)

            const createClient = await this.createClientUseCase.execute(params)

            return created(createClient)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
