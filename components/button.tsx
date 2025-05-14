import { Size, sizes, Variant, variants } from "@/lib/variants";
import { ReactNode, ButtonHTMLAttributes } from "react";


type ButtonProps = {
    variant?: Variant,
    size?: Size,
    children: ReactNode,
    
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    variant = 'default',
    size = 'base',
    children,
    className = "",
    ...rest

}: ButtonProps) {

    return (
        <button {...rest} className={`${variants[variant]} ${sizes[size]} ${className} cursor-pointer`}>
            {children}
        </button>
    )
}