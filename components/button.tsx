import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
    variant?: string,
    size?: string,
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    variant = 'default',
    size = 'base',
    children,
    ...rest

}: ButtonProps) {
    const variants = {
        default: `bg-black text-white dark:bg-white dark:text-black 
                hover:bg-gray-700 dark:hover:bg-gray-200 rounded-md`.trim(),
        outline: `border border-gray-300 dark:border-gray-500 
                rounded-md hover:bg-gray-300 dark:hover:bg-gray-500`.trim(),
        ghost: `rounded-md bg-white dark:bg-black hover:bg-gray-200 
                dark:hover:bg-gray-500 dark:bg-gray-500`.trim()
    };
    const sizes = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        base: 'text-base px-4 py-2',
        lg: 'text-lg px-4 py-2'
    };

    return (
        <button {...rest} className={`${variants[variant]} ${sizes[size]}`}>
            {children}
        </button>
    )
}