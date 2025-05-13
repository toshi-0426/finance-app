import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Separator from "@/components/separator";

type TransactionType = 'Income' | 'Expense' | 'Investment' | 'Saving';

interface Transaction {
    id: number,
    amount: number, 
    type: TransactionType,
    description: string,
    category: string,
    created_at: string
}


interface TransactionGroup{
    transactions: Transaction[],
    amount: number
};

type TransactionByDate = Record<string, TransactionGroup>;


const groupAndSumTransactionsByDate = (
    transactions: Transaction[]
): TransactionByDate => {
    const grouped: TransactionByDate  = {};
    for (const transaction of transactions) {
        const date = transaction.created_at.split('T')[0];
        if (!grouped[date]) {
            grouped[date] = {transactions: [], amount: 0}
        };
        grouped[date].transactions.push(transaction);
        const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount;
        grouped[date].amount += amount;
    }
    return grouped;
}

function parseYearMonthDate(date: string): Date {
    const [year, month, dAte] = date.split('-').map(Number);
    return new Date(year, month, dAte);
};

export default async function TransactionList(){
    const response: Response = await fetch(
        'http://localhost:3100/transactions'
    );
    
    const transactions = (await response.json()) as Transaction[];
    //console.log(transactions);
    //console.log(groupAndSumTransactionsByDate(transactions));
    const groupedTransactions = groupAndSumTransactionsByDate(transactions);
    //console.log(groupedTransactions);
    


    return (
        <div className="space-y-8">
            {Object.entries(groupedTransactions)
                .map(([date, {transactions, amount}]) => (
                    <div key={date} >
                        <TransactionSummaryItem 
                            date={parseYearMonthDate(date)}
                            amount={amount}
                        />
                        <Separator />
                        <section >
                            {transactions.map(transaction => <div key={transaction.id}>
                                <TransactionItem {...transaction} />
                            </div>)}
                        </section>
                    </div>
            ))}

        </div>
        
    )
}