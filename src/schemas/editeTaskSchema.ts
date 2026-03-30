
import * as z from 'zod';
import { COLUMNS, PRIORITIES } from '../consts';


export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at  least 3 letters"),
  description: z.string().optional(),
 priority: z.enum(PRIORITIES,{
  message: "Priority is required",
}),
 column: z.enum(COLUMNS,{
  message: "Status is required",
}),

});