import { z } from 'zod';

const schema = z.object({
  id: z
    .preprocess(
      (val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          const parsed = Number(val);
          if (!isNaN(parsed)) return parsed;
        }
        return undefined; // fontos: legyen undefined, ha nem értelmezhető szám
      },
      z.number().optional() // <-- ID optional lett
    ),
  author: z.string().optional(), // <-- author optional
  title: z.string().optional(),  // <-- title optional
});


export default schema;