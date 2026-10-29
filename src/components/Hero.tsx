type HeroProps = {
  onShowApps: () => void;
};

export function Hero({ onShowApps }: HeroProps) {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] bg-emerald-400/10 pointer-events-none" />
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full glass text-emerald-400">
          Una suite, infinitas posibilidades
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight text-neutral-50">
          Todas tus herramientas,{' '}
          <span className="text-emerald-400">en un solo lugar</span>
        </h1>
        <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
          Hova Suite reúne llamadas grupales, streaming, herramientas de IA y editores
          profesionales. Diseñado para crear, conectar y producir sin fricciones.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#apps"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-400 text-neutral-950 font-medium hover:bg-emerald-300 transition-colors"
          >
            Descargar suite
          </a>
          <button
            onClick={onShowApps}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full glass text-neutral-100 font-medium hover:border-emerald-400/30 transition-colors"
          >
            Ver aplicaciones
          </button>
        </div>
      </div>
    </section>
  );
}
