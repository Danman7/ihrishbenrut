interface CheckboxProps {
  id: string
  name: string
  label: string
  checked: boolean
  onChange: () => void
}

export const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={id}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-4 h-4 border-2 border-border rounded-sm flex items-center justify-center transition-all duration-200 ${
            checked
              ? 'bg-primary border-primary'
              : 'bg-background group-hover:border-primary'
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-background"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span>{label}</span>
      </label>
    </div>
  )
}
