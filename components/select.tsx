import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: SelectProps) {
    return <select {...props} className="w-full rounded-md small-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950">
        {props.children}
    </select>
}