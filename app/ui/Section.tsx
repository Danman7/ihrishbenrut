export const Section: React.FC<
  React.PropsWithChildren<{ title?: string; id?: string; className?: string }>
> = ({ children, title, id, className }) => (
  <section className={`mt-10 space-y-4 ${className}`}>
    {title && (
      <h2 id={id} className="scroll-mt-18 text-xl font-semibold">
        {title}
      </h2>
    )}

    {children}
  </section>
)
