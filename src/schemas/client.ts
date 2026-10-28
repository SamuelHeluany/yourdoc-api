import z from 'zod'

export const createClientSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, { message: 'First name is required.' }),
    last_name: z.string().trim().min(1, { message: 'Last name is required.' }),
    email: z.email({ message: 'Please, provide a valid email.' }).trim(),
    phone_number: z.e164({
        message: 'Please, provide a valid phone number(DDD + PHONE NUMBER).',
    }),
})
