import { useFormatCurrency } from "@/hooks/use-format-currency";

type TransactionSummaryItemProps = {
    date: Date,
    amount: number
};

export default function TransactionSummaryItem({
    date, amount
} : TransactionSummaryItemProps) {
    const formattedAmount = useFormatCurrency(amount);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    return (
        <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
            <div className="grow">
                {`${year}-${month}-${day}`}
            </div>

            <div className="min-w-[70px] text-right font-semibold">
                {formattedAmount}
            </div>

            <div className="min-w-[100px]"></div>
        </div>
    )
}