import TransactionForm from "@/app/dashboard/components/transaction-form";
import BackButton from "@/components/back-button";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


export const metadata = {
    'title': 'Edit Transaction'
}
/*
type PageProps = {
  params: { id: string };
};
*/

export default async function Page({
    params,
}: {
    params: Promise<{id: string}>
} ) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: transaction, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .single();
    
    //console.log(transaction);
    if (error) {
        notFound();
    }
    //console.log(transaction.id);
    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
            <BackButton className="mb-8"/>
            <TransactionForm id={transaction.id} initialData={transaction}/>   
        </>
    );
}