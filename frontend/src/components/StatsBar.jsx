export default function StatsBar() {
  const stats = [
    { num: '10+', label: 'Artisan Categories', desc: 'From Crown Crust to Platters' },
    { num: '50+', label: 'Signature Dishes', desc: 'Prepared with fresh ingredients' },
    { num: '10',  label: 'Value Combos', desc: 'Special, Family & Student deals' },
    { num: 'B-17', label: 'Islamabad Hub', desc: 'Mellow Multi Mall, Gate No. 2' },
  ]

  return (
    <div className="relative z-20 py-8 sm:py-10 px-4 sm:px-6 border-y border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
        {stats.map((s, i) => (
          <div key={s.label} className="relative group">
            <div className="flex flex-col">
              <span className="font-syne font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 group-hover:from-brand-red group-hover:to-orange-500 transition-all duration-300">
                {s.num}
              </span>
              <span className="font-syne font-bold text-xs sm:text-sm text-white tracking-wide mt-2">
                {s.label}
              </span>
              <span className="text-xs text-zinc-500 font-normal mt-0.5">
                {s.desc}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.08]" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
