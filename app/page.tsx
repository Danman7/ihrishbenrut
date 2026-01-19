import Link from 'next/link'
import { FlexWrapper } from './ui/FlexWrapper'
import { ROOT_NAVIGATION_ITEMS } from './constants'
import { Section } from './ui/Section'

export default function Page() {
  return (
    <>
      <article className="max-w-3xl mx-auto">
        <Section className="max-w-3xl mx-auto space-y-16 text-center h-[calc(100dvh-(--spacing(32)))] flex flex-col justify-around items-center px-4">
          <div className="font-display">
            <div className="text-5xl md:text-7xl text-primary font-bold animate-slide-left">
              Библиотека
            </div>

            <div className="text-4xl md:text-5xl animate-slide-right">
              на <span className="italic border-b">търсача</span>
            </div>
          </div>

          <FlexWrapper className="justify-center font-semibold text-xl">
            {ROOT_NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${0.3 + index * 0.3}s` }}
                className="animate-fade-in-scale px-4 py-2 hover:text-primary transition underline"
              >
                {item.name}
              </Link>
            ))}
          </FlexWrapper>
        </Section>

        <Section className="max-w-3xl mx-auto space-y-8 text-center px-4">
          <p>
            В живота търсѝ първо обвивката, после – обвитото, след това –
            семката, и най-после – разумното.
          </p>
          <p className="font-bold text-right! pb-4">Учителят</p>

          <p>
            Да бъдеш свободен, значи да действаш в съгласие с Божията истина.
            Лошо е, когато търсиш истина, която да отговаря на твоите желания.
          </p>
          <p className="font-bold text-right! pb-4">Брат Михаил Омраам</p>

          <p>
            Защото всичко що е от по-напред писано, за поучение нам е
            преднаписано, та чрез търпението и утешението на писанието да имаме
            надежда.
          </p>
          <p className="font-bold text-right! pb-4">Римляни 15:4</p>

          <p>
            Търсенето е неизбежно. Търсачът на Истината си залага живота. Той е
            Цялостен - търси с ума, сърцето, и волята заедно.
          </p>
          <p className="font-bold text-right! pb-4">Елеазар Хараш</p>
        </Section>
      </article>
    </>
  )
}
