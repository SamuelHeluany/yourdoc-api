export class DoctorNotExistsError extends Error {
    constructor(doctorId: string) {
        super(`The doctor id ${doctorId} not exists.`)
        this.name = 'DoctorNotExistsError'
    }
}
