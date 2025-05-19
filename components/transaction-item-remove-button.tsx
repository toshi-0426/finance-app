'use client'

import { deleteTransaction } from "@/lib/actions";
import Button from "./button";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";

type TransactionItemRemoveButtonProps = {
    id: number,
    onRemoved: (id: number) => void;
}

export default function TransactionItemRemoveButton({
    id, onRemoved
}: TransactionItemRemoveButtonProps) {
    const [loading, setLoading] = useState(false);
    const [conformed, setComformed] = useState(false);
    const handleClick = async () => {
        if (!conformed) {
            setComformed(!conformed);
            return
        }
        try {
            setLoading(true);
            await deleteTransaction(id);
            // notify the parent
            onRemoved(id);
        } finally {
            setLoading(false);
        }
        
    }
    return (
        <Button key={id} 
                size="xs"
                variant={ !conformed ? 'ghost' : 'danger' }
                className="border"
                aria-disabled={loading}
                onClick={handleClick}  
        >
            {!loading && <Trash2 className="w-4 h-4"/>}
            {loading && <Loader className="w-4 h-4 animate-spin"/>}
        </Button>
    )
}