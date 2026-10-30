import z from 'zod'

export const createConsultSchema = z.object({
    client_id: z.uuid({
        message: 'Client_id must be a valid ID.',
    }),
    doctor_id: z.uuid({
        message: 'Doctor_id must be a valid ID.',
    }),
    date: z.iso.datetime({
        message: 'Date must be a valid. (DD/MM/AA)',
    }),
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELED'], {
        message:
            'Consult Status must be "SCHEDULED" | "COMPLETED" | "CANCELED"',
    }),
})
