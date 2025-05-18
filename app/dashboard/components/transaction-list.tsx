import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Separator from "@/components/separator";
import { createClient } from "@/lib/supabase/server";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { RangeType } from "@/lib/consts";


function parseYearMonthDate(date: string): Date {
    const [year, month, dAte] = date.split('-').map(Number);
    return new Date(year, month, dAte);
};

export default async function TransactionList({range}: { range: RangeType }){
    const supabase = await createClient();
    const { data: transactions, error } = await supabase
        .rpc('fetch_transactions', {
            range_arg: range
        })
    
    if (error) {
        return <div>Error: loading transactions</div>
    }
  
    const groupedTransactions = groupAndSumTransactionsByDate(transactions ?? []);
    
    return (
        <div className="">
            {Object.entries(groupedTransactions)
                .map(([date, {transactions, amount}]) => (
                    <div key={date} className="mb-12">
                        <TransactionSummaryItem 
                            date={parseYearMonthDate(date)}
                            amount={amount}
                        />
                        <Separator />
                        <section className="space-y-2">
                            {transactions.map(transaction => <div key={transaction.id}>
                                <TransactionItem {...transaction}/>
                            </div>)}
                        </section>
                    </div>
            ))}
        </div>
        
    )
}