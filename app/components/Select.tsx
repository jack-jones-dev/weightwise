interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export default function Select({ label, ...props }: SelectProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-600">{label}</label>}
            <select
                {...props}
                className="border p-3 rounded-lg w-full text-gray-900 placeholder-gray-400"
            />
        </div>
    )
}