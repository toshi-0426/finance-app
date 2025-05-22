import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props:InputProps) {
    const {type, className, ...rest} = props;
    const styles = {
        'checkbox': "rounded accent-gray-600  border-gray-300 text-gray-700 dark:bg-gray-950 dark:text-gray-500 shadow-sm disabled:opacity-50",
        'text': "w-full rounded-md small-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-50",
    }

    const key = type === "checkbox" ? "checkbox" : "text";



    return <input {...rest} key={key} type={key} className={`${styles[key]} ${className ?? ""}`}
            />

}