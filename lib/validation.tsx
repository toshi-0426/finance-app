import { z } from 'zod';
import { categories, TransactionCategory, types } from './consts';

export const TransactionSchema = z.object({
  type: z.enum(types, {
    errorMap: () => ({ message: "Please select a transaction type"})
  }),
  category: z.preprocess(
    (val) => (typeof val === 'string' && val?.length ? val: undefined), 
    //z.string().optional()
    z.enum(categories).optional()
  ),
  amount: z.coerce.number({
    invalid_type_error: "Age must be a number",
  }).min(1, {
    message: "The amount must be at least 1",
  }),
  description: z.string().optional(),
  created_at: z.string().date("Data must contain a valid date"),
}).refine((data) =>{
  if (data.type === 'Expense') {
    return data.category !== undefined && categories.includes(data.category as TransactionCategory)
  }
  return true;
}, {
  path: ["category"],
  message: "Category is required for Expense"
})

export type Inputs = z.infer<typeof TransactionSchema>;
