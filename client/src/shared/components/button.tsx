interface IButtonProps {
    isLoader: boolean,
    onClick?: Function,
    className?: string,
    children: React.ReactNode
    mergeClasses?: boolean,
    disabled?: boolean
}

export const PrimaryButton: React.FC<IButtonProps> = ({
    isLoader = false,
    onClick = null,
    className = '',
    children,
    mergeClasses = true,
    disabled = false
}) => {

    const defaultClass = "w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200";

    return (
        <button className={mergeClasses ? `${defaultClass} ${className ?? ""}` : defaultClass}
            onClick={() => {
                if (onClick && !isLoader) {
                    onClick()
                }
            }}
            disabled={disabled}
        >
            <div className="flex items-center gap-5 justify-center">
                {
                    isLoader ? (
                        <div>
                            Loading
                        </div>
                    ) : children
                }


            </div>
        </button>
    )
}




export const BorderButton: React.FC<IButtonProps> = ({
    isLoader = false,
    onClick = null,
    className = '',
    children,
    mergeClasses = true
}) => {

    const defaultClass = "block w-full text-center text-orange-600 border border-orange-600 rounded-3xl p-3 text-sm font-medium hover:bg-orange-50 transition duration-200";

    return (
        <button className={mergeClasses ? `${defaultClass} ${className ?? ""}` : defaultClass}
            onClick={() => {
                if (onClick && !isLoader) {
                    onClick()
                }
            }}>
            <div className="flex items-center gap-5 justify-center">
                {
                    isLoader ? (
                        <div>
                            Loading
                        </div>
                    ) : children
                }


            </div>
        </button>
    )
}


