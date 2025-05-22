'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';
import { Inputs } from './validation';
import { TransactionSchema } from './validation';
import { FormState, RangeType } from './consts';
import { redirect } from 'next/navigation';



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

export async function login(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email');
  if (!email || typeof email !== 'string'){
    return {
      error: true,
      message: 'Invalid email'
    }
  }
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true
    }
  });

  if (error) {
    return {
      error: true,
      message: 'Error Authenticating'
    }
  }

  return {
    message: `Email sent to ${email}`,
    error: false
  }
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sing-out Error', error);
    return;
  };

  redirect("/login");
}

export async function uploadAvator(formData: FormData) {
  const supabase = await createClient();
  console.log(formData);
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file uploaded');
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    throw new Error('Only JPEG or PNG files are allowed');
  }

  if (file.size > 512 * 1024) {
    throw new Error('File size must be less than 512 KB');
  }


  const fileExtension = file.name.split('.').pop();
  const filename = `${Math.random()}.${fileExtension}`;
  
  const { error } = await supabase.storage 
        .from('avatars')
        .upload(filename, file);
    
  if (error) {
    throw new Error('Error Uploading avatar');
  }

  console.log('Success Uploading avatar');

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: filename
    }
  })

  if (dataUpdateError) {
    throw new Error('Error associating the avatar with the user');
  }

  console.log('Success Updating user');

}