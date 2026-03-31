import Link from 'next/link'
import { FlexWrapper } from './ui/FlexWrapper'
import { ROOT_NAVIGATION_ITEMS } from './constants'
import { Section } from './ui/Section'

export default function Page() {
  return (
    <main tabIndex={-1} className="edge-padding py-12 md:py-0">
      <section className="max-w-3xl mx-auto space-y-20 h-dvh flex flex-col justify-around">
        <div className="space-y-2 md:space-y-4 font-bold text-center font-display">
          <div className="text-5xl md:text-6xl animate-slide-left text-primary">
            Библиотека
          </div>

          <div
            className="text-3xl md:text-4xl animate-slide-right"
            style={{ animationDelay: '0.3s' }}
          >
            на <span className="italic border-b">търсача</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex-list text-lg justify-center">
            {ROOT_NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${0.6 + index * 0.3}s` }}
                className="animate-fade-in-scale"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="animate-fade-in-scale"
          style={{ animationDelay: '1.2s' }}
        >
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
        </div>
      </section>
    </main>
  )
}
