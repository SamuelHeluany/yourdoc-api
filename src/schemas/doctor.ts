import z from 'zod'
// zod create client validations
export const createDoctorSchema = z.object({
    name: z.string().trim().min(1, { message: 'Doctor name is required.' }),
    email: z.email({ message: 'Please, provide a valid email.' }),
    medical_area: z
        .string()
        .trim()
        .min(1, { message: 'Medical area is required.' }),
})

export const updateDoctorSchema = z.strictObject(
    createDoctorSchema.partial().shape,
    'Some provided field is not allowed.',
)
