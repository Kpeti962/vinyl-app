import {z} from 'zod';


const schema = z.object({
    author: z.string().optional(),
    title: z.string().optional(),
})

export default schema;