import { SelectHTMLAttributes, forwardRef } from 'react'

export interface Option {
  value: string
  label: string
}

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
  error?: string
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ options, error, className = '', ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        <select
          ref={ref}
          className="w-full p-2 bg-hoverLight rounded border-1 border-input text-black focus:outline-none focus:ring-1 focus:ring-accent shadow-xs"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  },
)

SelectBox.displayName = 'SelectBox'

export default SelectBox
