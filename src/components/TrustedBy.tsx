export function TrustedBy() {
  const brands = [
    "Nova Skincare",
    "Peak Supps",
    "Sprint Fit",
    "Glow Med Spa",
    "Vital Labs",
    "Urban Café"
  ];

  return (
    <section className="py-20 border-y border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-slate-500 uppercase tracking-wider text-sm mb-3">Trusted Partnerships</p>
          <h3 className="text-slate-900 mb-3">Trusted by founders & local operators</h3>
          <p className="text-slate-600">Working with ambitious brands across industries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-5 rounded-xl flex items-center justify-center text-center hover:from-slate-800 hover:to-slate-700 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 border border-slate-700/50"
            >
              <span className="text-sm">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
