// Erros relacionados ao usuário extendendo errors do js

// Erro se o email do client já existir em outro cadastro
export class EmailAlreadyInUseError extends Error {
    constructor(email: string) {
        super(`The e-mail ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class ClientNotExistsError extends Error {
    constructor(clientId: string) {
        super(`The client id ${clientId} not exists.`)
        this.name = 'ClientNotExistsError'
    }
}
