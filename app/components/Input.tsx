interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-600">{label}</label>}
            <input
                {...props}
                className="border p-3 rounded-lg w-full text-gray-900 placeholder-gray-400"
            />
        </div>
    )
}