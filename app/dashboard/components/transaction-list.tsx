'use client'

import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Separator from "@/components/separator";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { RangeType, Transaction } from "@/lib/consts";
import { useState } from "react";
import Button from "@/components/button";
import { fetchTransactions } from "@/lib/actions";
import { Loader } from "lucide-react";


function parseYearMonthDate(date: string): Date {
    const [year, month, dAte] = date.split('-').map(Number);
    return new Date(year, month, dAte);
};

export default function TransactionList({ 
    initialTransactions, range
}: { initialTransactions: Transaction[],
     range: RangeType
 }){

    const [transactions, setTransactions] = useState(initialTransactions);
    const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0);
    const [loading, setLoading] = useState(false);
    const groupedTransactions = groupAndSumTransactionsByDate(transactions ?? []);

    const handleClick = async () => {
        setLoading(true);
        try {
            const limit = 10;
            const nextTransactions = await fetchTransactions(range, transactions.length, limit);
            setButtonHidden(nextTransactions.length === 0);
            setTransactions(prevTransactions => {
                const existingIds = new Set(prevTransactions.map((t: Transaction) => t.id));
                const dedupedTransactions = nextTransactions.filter((t: Transaction) => !existingIds.has(t.id) )
                return [...prevTransactions, ...dedupedTransactions]
            })
        } finally {
            setLoading(false);
        }
    }

    const handleRemoved = (id: number) => {
        setTransactions(prev => prev.filter((t: Transaction) => t.id !== id));
    }   
    
    return (
        <div className="space-y-8">
            {Object.entries(groupedTransactions)
                .map(([date, {transactions, amount}]) => (
                    <div key={date} className="mb-12">
                        <TransactionSummaryItem 
                            date={parseYearMonthDate(date)}
                            amount={amount}
                        />
                        <Separator />
                        <section className="space-y-2">
                            
                            {transactions.map(transaction => <div key={`${transaction.id}-${date}`}>
                                <TransactionItem {...transaction} onRemoved={handleRemoved} />
                            </div>)}
                        </section>
                    </div>
            ))}
            {transactions.length === 0 
            && <div className="text-center text-gray-400 dark:text-gray-500">
                No transactions found 
            </div>}
            {!buttonHidden && 
                <div className="flex justify-center">
                    <Button variant="ghost" className="border" onClick={handleClick} disabled={loading}>
                        <div className="flex items-center space-x-2">
                            {loading && <Loader className="animate-spin"/>}
                            <div>Load More ...</div>
                        </div>
                    </Button>
                </div>}
        </div>
        
        
    )
}