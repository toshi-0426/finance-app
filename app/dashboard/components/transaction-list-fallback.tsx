import Skelton from "@/components/skelton";

export default function TransactionListFallback() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <TransactionSummaryItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
            </div>
            <div className="space-y-4">
                <TransactionSummaryItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
                <TransactionItemSkelton />
            </div>
        </div>
    );
};

function TransactionItemSkelton() {
    return (
        <div className="w-full flex items-center space-x-4">
            <div className="flex items-center grow">
                <Skelton />
            </div>
            <div className="min-w-[150px] items-center hidden md:flex">
                <Skelton />
            </div>

            <div className="min-w-[70px] text-right"><Skelton /></div>
            <div className="min-w-[50px] flex justify-end"><Skelton /></div>
        </div>
    )
}


function TransactionSummaryItemSkelton() {
    return (
        <div className="flex space-x-4">
            <div className="grow">
                <Skelton />
            </div>

            <div className="min-w-[70px]">
                <Skelton />
            </div>

            <div className="min-w-[50px]">
                <Skelton />
            </div>
        </div>
    )
}
