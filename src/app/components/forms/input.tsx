import { twMerge } from 'tailwind-merge';

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

    function generateInputClassNames(){
        return twMerge(
            'block w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg p-2.5',
            'sm:text-sm',
            'focus:ring-primary-600 focus:border-primary-600',
            'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            inputClassName
        );
    }

    function generateLabelClassNames() {
        return twMerge(
            "block mb-2 text-sm font-medium text-gray-900",
            "dark:text-white",
            labelClassName
        );
    }

    return (
        <>
            {withLabel && (
                <label
                    htmlFor={id}
                    className={generateLabelClassNames()}
                >
                    {labelText}
                </label>
            )}

            <input
                type={inputType}
                name={inputName}
                id={id}
                className={generateInputClassNames()}
                placeholder={inputPlaceholder}
                required={isRequired}
                defaultValue={inputDefaultValue}
            />
        </>
    )
}