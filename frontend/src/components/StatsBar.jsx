export default function StatsBar() {
  const stats = [
    { num: '10+', label: 'Menu Categories' },
    { num: '50+', label: 'Menu Items' },
    { num: '10',  label: 'Special Deals' },
    { num: 'B-17', label: 'Islamabad' },
  ]
  return (
    <div className="bg-brand-red py-5 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <span className="block font-bebas text-4xl tracking-[3px] text-white">{s.num}</span>
            <span className="text-white/80 text-[0.65rem] tracking-[3px] uppercase">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
