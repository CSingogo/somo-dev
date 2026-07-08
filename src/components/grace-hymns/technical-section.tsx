const specs = [
  { label: "Core Framework", value: "React Native" },
  { label: "Cloud Services", value: "Managed Cloud API" },
  { label: "Navigation", value: "Expo Router" },
  { label: "State Engine", value: "Zustand Management" },
];

export function TechnicalSection() {
  return (
    <section id="technical" className="border-t border-gh-outline-variant py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.4em] text-gh-primary-container">
              Architecture
            </span>
            <h2 className="mb-10 font-serif text-5xl font-bold leading-tight tracking-tight text-gh-on-background">
              Engineering Devotion.
            </h2>
            <p className="mb-12 text-lg font-light leading-relaxed text-gh-secondary">
              We believe technical excellence is a form of service. Grace Hymns
              is built on a foundation of reliability, speed, and modern
              minimalism.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="border-t border-gh-on-background">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-gh-outline-variant py-8 last:border-b-0"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gh-secondary">
                    {spec.label}
                  </span>
                  <span className="font-serif text-xl font-semibold text-gh-on-background">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
