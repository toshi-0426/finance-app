import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: { id: string };
};


export default async function Page({params: {id}}: PageProps ) {
    const supabase = await createClient();

    const { data: transaction, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .single();
    
    console.log(transaction);

    return (
        <>
            Hello!
        </>
    )
}