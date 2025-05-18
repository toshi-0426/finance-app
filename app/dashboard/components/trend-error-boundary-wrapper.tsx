'use client'

import { TransactionType } from "@/lib/consts";
import { ErrorBoundary } from "react-error-boundary";



type ErrorBoundaryProps = {
    type: TransactionType,
    fallback: React.ReactNode,
    children: React.ReactNode
};

export default function ErrorBoundaryWrapper({
    type, fallback, children
}: ErrorBoundaryProps) {
    return (
        <ErrorBoundary key={type} fallback={fallback}>
            {children}
        </ErrorBoundary>
    )
}