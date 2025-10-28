import { Checkbox } from './Checkbox'

interface FilterGroupProps<T extends string | number> {
  title: string
  options: T[]
  selectedOptions: T[]
  availableOptions: T[]
  onToggle: (option: T) => void
  idPrefix: string
}

export const FilterGroup = <T extends string | number>({
  title,
  options,
  selectedOptions,
  availableOptions,
  onToggle,
  idPrefix,
}: FilterGroupProps<T>) => {
  return (
    <fieldset className="border border-foreground p-4 rounded-md mt-4">
      <legend className="text-lg">{title}</legend>

      <div className="flex flex-wrap gap-4" role="group">
        {options.map((option) => {
          const isAvailable = availableOptions.includes(option)
          const isSelected = selectedOptions.includes(option)

          // Hide unavailable options unless they are selected
          if (!isAvailable && !isSelected) {
            return null
          }

          return (
            <div key={option} className={!isAvailable ? 'opacity-50' : ''}>
              <Checkbox
                id={`${idPrefix}-${option}`}
                name={`${idPrefix}-${option}`}
                label={String(option)}
                checked={isSelected}
                onChange={() => onToggle(option)}
                disabled={!isAvailable && !isSelected}
              />
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
