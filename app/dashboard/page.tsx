import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { rangeTypes, RangeType, types as trendTypes} from "@/lib/consts";
import ErrorBoundaryWrapper from "./components/trend-error-boundary-wrapper";
import Range from "./components/range";


export default async function Page({ 
    searchParams 
}: {
  searchParams: Promise<{ range?: string | string[] }>
}) {
    const searchparams = await searchParams;
    const rawRange = Array.isArray(searchparams.range) ? searchparams.range[0] : searchparams.range;
    const range: RangeType = rangeTypes.includes(rawRange as RangeType) ? (rawRange as RangeType) : 'last30days';
    //const range = searchparams.range ?? 'last30days';
    //const range = (await searchParams).range ?? 'last30days';
    //const range = searchParams.range ?? 'last30days';

    return (<>
        <section className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-semibold">Summary</h1>
            <aside>
                <Range />
            </aside>
        </section>

        <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">

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

        <section className="flex justify-between items-center mb-8">
            <h2 className="text-2xl">Transactions</h2>
            <Link href="/dashboard/transaction/add" 
                className={`flex items-center mb-8 space-x-1 cursor-pointer ${variants['outline']} ${sizes['sm']}`}>
                <CirclePlus className="w-4 h-4"/>
                <div>Add</div>
            </Link>
        </section>

        <Suspense fallback={<TransactionListFallback />}>
            <TransactionList range={range}/>
        </Suspense>
       

        
    </>
    )
}