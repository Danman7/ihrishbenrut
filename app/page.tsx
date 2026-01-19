import Link from 'next/link'

export default function Page() {
  return (
    <>
      <article className="max-w-3xl mx-auto">
        <div className="text-5xl text-center py-20 font-serif">
          <div className="text-primary">Библиотека</div>
          <div className="text-4xl">на търсача</div>
        </div>

        <div className="flex justify-center items-center gap-4 text-lg mb-12">
          <Link href="/books" className="underline underline-offset-2">
            Книги
          </Link>
          <div>|</div>
          <Link href="/prayers" className="underline underline-offset-2">
            Молитви
          </Link>
          <div>|</div>
          <Link href="/prayers" className="underline underline-offset-2">
            Мъдрости
          </Link>
        </div>

        <p>
          В живота търсѝ първо обвивката, после – обвитото, след това – семката,
          и най-после – разумното.
        </p>
        <p className="font-bold text-right! pb-4">Учителят</p>

        <p>
          Да бъдеш свободен, значи да действаш в съгласие с Божията истина. Лошо
          е, когато търсиш истина, която да отговаря на твоите желания.
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
      </article>
    </>
  )
}
