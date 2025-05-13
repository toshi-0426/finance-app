import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useFormatCurrency } from "@/hooks/use-format-currency";

type TrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving',
    amount: number,
    preAmount: number
}

export default function Trend({ 
    type, 
    amount, 
    preAmount
}: TrendProps ) {
    const colorClasses = {
        'Income': 'text-green-700 dark:text-green-300',
        'Expense': 'text-red-700 dark:text-red-300',
        'Investment': 'text-indigo-700 dark:text-indigo-300',
        'Saving': 'text-yellow-700 dark:text-yellow-300',
    }

    const calcPercentageChange = (
        amount: number, 
        preAmount: number
    ): number => {
        if (preAmount === 0) return 0;
        return ((amount - preAmount) / preAmount) * 100
    };

    const percentageChange = useMemo(
        () => calcPercentageChange(amount, preAmount),
        [amount, preAmount]
    )

    const percentageChangeStr = useMemo(
        () => percentageChange.toFixed(1),
        [percentageChange]
      );


    const formattedAmount = useFormatCurrency(amount)


    return (
        <div>
            <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
            <div className="text-2xl font-semibold text-black dark:text-white mb-2">
                {formattedAmount}
            </div>
            <div className="flex space-x-1 items-center text-sm">
                {percentageChange <= 0 && <ArrowDownLeft className="text-red-700 dark:text-red-300" />}
                {percentageChange > 0 && <ArrowUpRight className="text-green-700 dark:text-green-300"/>}
                {percentageChangeStr}% vs last period
            </div>
        </div>
    )
}