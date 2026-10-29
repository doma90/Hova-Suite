import { useState, useEffect } from 'react';
import { X, Download, Check } from 'lucide-react';
import type { App } from '@/data/apps';
import { VideoPlayer } from '@/components/VideoPlayer';

type AppModalProps = {
  app: App | null;
  onClose: () => void;
};

export function AppModal({ app, onClose }: AppModalProps) {
  const [tab, setTab] = useState<'Capturas' | 'Video'>('Capturas');
  const [shot, setShot] = useState(0);

  useEffect(() => {
    if (!app) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [app, onClose]);

  useEffect(() => {
    setTab('Capturas');
    setShot(0);
  }, [app]);

  if (!app) return null;

  const Icon = app.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={app.name}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl glass-strong depth-shadow-lg overflow-hidden animate-[scaleIn_0.2s_ease-out]">
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={app.preview}
            alt={app.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1226] via-black/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full glass text-neutral-200 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-emerald-400/10 text-emerald-400">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold leading-tight text-neutral-50">{app.name}</h3>
              <span className="text-xs text-neutral-400">{app.category}</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">{app.description}</p>

          <div className="mt-5 flex gap-2 border-b border-white/5 pb-px">
            {(['Capturas', 'Video'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'px-3 pb-2 text-sm font-medium transition-colors border-b-2 -mb-px ' +
                  (tab === t
                    ? 'border-emerald-400 text-neutral-50'
                    : 'border-transparent text-neutral-500 hover:text-neutral-200')
                }
              >
                {t === 'Video' ? 'Video demostrativo' : 'Capturas'}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tab === 'Capturas' ? (
              <div>
                <div className="rounded-xl overflow-hidden glass">
                  <img
                    src={app.screenshots[shot]}
                    alt={`${app.name} captura ${shot + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  {app.screenshots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setShot(i)}
                      className={
                        'h-14 w-24 rounded-lg overflow-hidden border-2 transition-colors ' +
                        (i === shot ? 'border-emerald-400' : 'border-transparent opacity-60 hover:opacity-100')
                      }
                    >
                      <img src={s} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <VideoPlayer src={app.video} poster={app.screenshots[0]} />
            )}
          </div>

          <h4 className="mt-6 text-sm font-medium text-neutral-200">Características clave</h4>
          <ul className="mt-3 space-y-2">
            {app.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                <Check className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={app.href}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-neutral-950 font-medium hover:bg-emerald-300 transition-colors"
          >
            <Download className="h-4 w-4" />
            Descargar {app.name}
          </a>
        </div>
      </div>
    </div>
  );
}
