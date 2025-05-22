

type FileInputProps = {
    type?: string,
    name: string,
    id: string,
    className?: string
}
export default function FileInput({
    type='', name, id, className=''
}: FileInputProps) {
    const styles = 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400';
    return (
        <input type={type} name={name} id={id} className={`${styles} ${className}`} />
    )
}