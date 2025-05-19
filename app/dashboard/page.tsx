import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { rangeTypes, RangeType, types as trendTypes} from "@/lib/consts";
import ErrorBoundaryWrapper from "./components/trend-error-boundary-wrapper";
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";


export default async function Page({ 
    searchParams 
}: {
  searchParams: Promise<{ range?: string | string[] }>
}) {
    const searchparams = await searchParams;
    const rawRange = Array.isArray(searchparams.range) ? searchparams.range[0] : searchparams.range;
    const range: RangeType = rangeTypes.includes(rawRange as RangeType) ? (rawRange as RangeType) : 'last30days';
    
    return (<div className="space-y-8">
        <section className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold">Summary</h1>
            <aside>
                <Range />
            </aside>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {trendTypes.map(type => (
                <ErrorBoundaryWrapper 
                    key={type} 
                    type={type}
                    fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
                        <Suspense fallback={<TrendFallback/>}>
                            <Trend type={type} range={range}/>
                        </Suspense>
                </ErrorBoundaryWrapper>
            ))}
        </section>

        <section className="flex justify-between items-center">
            <h2 className="text-2xl">Transactions</h2>
            <Link href="/dashboard/transaction/add" 
                className={`flex items-center mb-8 space-x-1 cursor-pointer ${variants['outline']} ${sizes['sm']}`}>
                <CirclePlus className="w-4 h-4"/>
                <div>Add</div>
            </Link>
        </section>

        <Suspense fallback={<TransactionListFallback />}>
            <TransactionListWrapper range={range}/>
        </Suspense>
       

        
    </div>
    )
}