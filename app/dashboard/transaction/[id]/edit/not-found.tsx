import BackButton from "@/components/back-button";


export default function NotFount() {
    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">Transaction Not Found</h1>
            <BackButton className="mb-8"/>  
            <p className="text-gray-400 dark:text-gray-500">The transaction could not be found or could not be fetched</p>
        </>
    );
}