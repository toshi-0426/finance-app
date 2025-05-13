import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props:InputProps) {
    const styles = {
        'checkbox': "rounded accent-gray-600  border-gray-300 text-gray-700 dark:bg-gray-950 dark:text-gray-500 shadow-sm",
        'default': "w-full rounded-md small-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
    }



    return <input {...props} className={styles[props.type] ?? styles['default']}></input>
}