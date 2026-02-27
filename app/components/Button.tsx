interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'delete';
}

export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    variant = 'primary'
}: ButtonProps) {
    const styles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        delete: 'bg-red-500 text-white hover:bg-red-600',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-2 rounded-lg disabled:opacity-50 transition-colors ${styles[variant]}`}
        >
            {children}
        </button>
    )
}