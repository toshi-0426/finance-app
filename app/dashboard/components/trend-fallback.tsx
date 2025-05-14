import Skelton from "@/components/skelton";

export default function TrendFallback() {
    return (
        <div className="space-y-5 w-3/5 lg:w-5/6">
            <div>
                <Skelton />
            </div>
            <div className="mb-2">
                <Skelton />
            </div>
            <div className="flex space-x-2">
                <Skelton />
            </div>
        
        </div>
    );
};