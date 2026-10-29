import { notFound } from './http.js'

export const doctorNotFoundResponse = () => {
    return notFound({ message: 'Doctor not found.' })
}
