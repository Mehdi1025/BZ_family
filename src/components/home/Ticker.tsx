const items = [
  "Solidarité de quartier",
  "Aide alimentaire",
  "Accompagnement scolaire",
  "Lien social",
  "850+ familles",
  "45 bénévoles",
  "Depuis 2019",
  "Loi 1901",
];

export function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
