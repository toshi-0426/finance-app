import { TransactionType } from "./consts";

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



export const groupAndSumTransactionsByDate = (
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
