interface InputProps {
    withLabel?: boolean;
    id: string;
    labelClassName?: string;
    labelText?: string;
    inputClassName?: string;
    inputName: string;
    inputType?: string;
    inputPlaceholder?: string;
    inputDefaultValue?: any;
    isRequired?: boolean;
}

export default function Input({
    withLabel = true,
    id,
    labelText,
    labelClassName,
    inputClassName,
    inputName,
    inputType = 'text',
    inputPlaceholder,
    inputDefaultValue,
    isRequired = false,
}: InputProps) {
    return (
        <>
            {withLabel && (
                <label
                    htmlFor={id}
                    className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white " + labelClassName}
                >
                    {labelText}
                </label>
            )}

            <input
                type={inputType}
                name={inputName}
                id={id}
                className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + inputClassName}
                placeholder={inputPlaceholder}
                required={isRequired}
                defaultValue={inputDefaultValue}
            />
        </>
    )
}