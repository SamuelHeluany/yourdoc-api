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
// passa o update com partial do create, ou seja, transforma tudo do create em opcional. Se passar uma propriedade, ele aciona o zod do create
// Passa o update com um strickObject, passando o createClientSchema com os campos não obrigatórios e o shape, caso o retorno do shape for algum campo invalido, ele retorna a mensagem de erro
export const updateClientSchema = z.strictObject(
    createClientSchema.partial().shape,
    'Some provided field is not allowed',
)
