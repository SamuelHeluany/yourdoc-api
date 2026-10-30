import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (clientId: string) => validator.isUUID(clientId)

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided ID is not valid.',
    })
}

type RequiredField = 'clientId' | 'doctorId' | 'consultId'

export const requiredFieldMissingResponse = (missingField: RequiredField) =>
    badRequest({ message: `Missing params: ${missingField}` })
