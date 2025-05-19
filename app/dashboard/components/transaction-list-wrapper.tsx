import { fetchTransactions } from "@/lib/actions"
import { RangeType } from "@/lib/consts"
import TransactionList from "./transaction-list";


export default async function TransactionListWrapper({
    range
}: {
    range: RangeType
}){
    const transactions = await fetchTransactions(range);
    return (
        <>
          <TransactionList  
            initialTransactions={transactions} 
            key={range}
            range={range}
          />
        </>
    )
}