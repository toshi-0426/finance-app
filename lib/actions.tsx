'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';
import { Inputs } from './validation';
import { TransactionSchema } from './validation';
import { RangeType } from './consts';



export async function createTransaction(formData: Inputs) { 
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

export async function fetchTransactions(
  range: RangeType, offset: number = 0, limit: number = 10
){
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .rpc('fetch_transactions', {
      offset_arg: offset,
      limit_arg: limit,
      range_arg: range,
    })

  if (error) {
        return <div>Error: loading transactions</div>
    }
  return transactions;
}

export async function deleteTransaction(id: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Could not delete the transaction: ${id}`);
  }
  revalidatePath("/dashboard");
}


export async function updateTransaction(id: string, formData: Inputs) { 
  const validated = TransactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient();
  const { error } = await supabase
      .from('transactions')
      .update(validated.data)
      .eq('id', id);

  if (error) {
    throw new Error('Failed updating the transaction');
  } 

  revalidatePath('/dashboard');
}

