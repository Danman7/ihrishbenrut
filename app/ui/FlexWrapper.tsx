import React from 'react'

export const FlexWrapper: React.FC<
  React.PropsWithChildren<{ className?: string; onClick?: () => void }>
> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`flex flex-wrap gap-1 items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
