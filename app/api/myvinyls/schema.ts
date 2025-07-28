import {z} from 'zod';


const schema = z.object({
    author: z.string().min(1),
    title: z.string().min(1)
})

export default schema;