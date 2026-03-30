
import * as z from 'zod';
import type { columnNameType, taskPeriorityType } from '../types';

const PRIORITIES = ["HIGH", "LOW", "MEDIUM"] as taskPeriorityType[];
const COLUMN = [ 'backlog','in_progress','review','done'] as columnNameType[];

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at  least 3 letters"),
  description: z.string().optional(),
 priority: z.enum(PRIORITIES,{
  message: "Priority is required",
}),
 column: z.enum(COLUMN,{
  message: "Status is required",
}),

});