'use server'


import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';
import { Inputs } from './validation';
import { TransactionSchema } from './validation';



export async function createTransaction(formData: Inputs) {
  // handle errors
  // validate data 
  const validated = TransactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient();
  const { error } = await supabase.from('transactions').insert(validated.data);

  if (error) {
    throw new Error('Failed creating the transaction');
  } 

  revalidatePath('/dashboard');
}