interface FilterSelectProps<T extends string | number> {
  title: string
  value: T | null
  onChange: (value: T | null) => void
  options: T[]
  availableOptions: T[]
  placeholder: string
  getOptionLabel?: (option: T) => string
}

export const FilterSelect = <T extends string | number>({
  title,
  value,
  onChange,
  options,
  availableOptions,
  placeholder,
  getOptionLabel = (option) => String(option),
}: FilterSelectProps<T>) => {
  return (
    <fieldset className="border border-foreground p-4 rounded-md">
      <legend className="text-lg">{title}</legend>

      <select
        value={value ? String(value) : ''}
        onChange={(e) => {
          const selectedValue = e.target.value
          if (!selectedValue) {
            onChange(null)
          } else {
            const option = options.find((opt) => String(opt) === selectedValue)
            if (option !== undefined) {
              onChange(option)
            }
          }
        }}
        className="w-full p-2 border rounded-md bg-background text-foreground border-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label={title}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const isAvailable = availableOptions.includes(option)
          const isSelected = value === option

          // Hide unavailable options unless they are selected
          if (!isAvailable && !isSelected) {
            return null
          }

          return (
            <option
              key={option}
              value={String(option)}
              disabled={!isAvailable && !isSelected}
              style={{ opacity: !isAvailable && !isSelected ? 0.5 : 1 }}
            >
              {getOptionLabel(option)}{' '}
              {!isAvailable && isSelected ? ' (избрано)' : ''}
            </option>
          )
        })}
      </select>
    </fieldset>
  )
}
