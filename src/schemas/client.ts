import z from 'zod'

export const createClientSchema = z.object({
    id: z.uuid(),
    first_name: z
        .string()
        .trim()
        .min(1, { message: 'First name is required.' }),
    last_name: z.string().trim().min(1, { message: 'First name is required.' }),
    email: z.email({ message: 'Please, provide a valid one.' }).trim(),
    phone_number: z.e164({
        message: 'Please, provide a valid phone number(DDD + PHONE NUMBER).',
    }),
})
