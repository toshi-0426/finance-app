'use client'

import { useFormStatus } from "react-dom";
import Button from "./button";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from 'lucide-react';
import { Size, Variant } from "@/lib/variants";

type ButtonProps = {
    variant?: Variant,
    size?: Size,
    className?: string,
    children: ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>;


export default function SubmitButton({
    children,
    className = "",
    ...rest
}: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button {...rest} aria-disabled={pending} className={`${className} flex items-center space-x-2 justify-center`}>
            {pending && <Loader className="animate-spin w-4 h-4"/>}
            <span>{children}</span>
        </Button>
    )
}