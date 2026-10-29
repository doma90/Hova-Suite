import { useState } from 'react';
import { Download } from 'lucide-react';
import { apps, tabs, type App, type Category } from '@/data/apps';

type AppsGridProps = {
  onSelect: (app: App) => void;
};

export function AppsGrid({ onSelect }: AppsGridProps) {
  const [activeTab, setActiveTab] = useState<'Todas' | Category>('Todas');

  const filtered = activeTab === 'Todas' ? apps : apps.filter((app) => app.category === activeTab);

  return (
    <section id="apps" className="section-depth px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-50">Aplicaciones incluidas</h2>
          <p className="mt-2 text-neutral-400">Descarga cada herramienta por separado o instala la suite completa.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-emerald-400 text-neutral-950'
                    : 'glass text-neutral-400 hover:text-neutral-100')
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((app) => (
            <article
              key={app.name}
              className="group relative flex flex-col rounded-2xl glass card-glow depth-shadow p-6 hover:border-emerald-400/30"
            >
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-400/10 text-emerald-400">
                <app.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-medium text-neutral-50">{app.name}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed flex-1">{app.description}</p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => onSelect(app)}
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Ver aplicaciones
                </button>
                <a
                  href={app.href}
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
