import { notFound } from './http.js'

export const clientNotFoundResponse = () => {
    return notFound({ message: 'Client not found.' })
}
