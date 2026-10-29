import { useState } from 'react';
import {
  Users,
  CheckSquare,
  Clapperboard,
  Radio,
  Sparkles,
  Bot,
  PenLine,
  Palette,
  ArrowRight,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Node = {
  id: string;
  name: string;
  icon: LucideIcon;
  desc: string;
};

const nodes: Node[] = [
  { id: 'call', name: 'Hova Call', icon: Users, desc: 'Reuniones y grabaciones' },
  { id: 'tasks', name: 'Hova Tasks', icon: CheckSquare, desc: 'Gestión de proyectos' },
  { id: 'ai', name: 'Hova AI', icon: Sparkles, desc: 'Generación de contenido' },
  { id: 'automate', name: 'Hova Automate', icon: Bot, desc: 'Flujos automatizados' },
  { id: 'stream', name: 'Hova Stream', icon: Clapperboard, desc: 'Multitransmisión' },
  { id: 'live', name: 'Hova Live', icon: Radio, desc: 'Eventos en directo' },
  { id: 'edit', name: 'Hova Edit', icon: PenLine, desc: 'Edición multicapa' },
  { id: 'design', name: 'Hova Design', icon: Palette, desc: 'Diseño y prototipado' },
];

type Flow = { from: string; to: string; label: string };

const flows: Flow[] = [
  { from: 'call', to: 'tasks', label: 'Crea tareas desde la transcripción' },
  { from: 'tasks', to: 'automate', label: 'Dispara flujos por estado' },
  { from: 'ai', to: 'automate', label: 'Ejecuta acciones con IA' },
  { from: 'automate', to: 'stream', label: 'Inicia transmisiones' },
  { from: 'stream', to: 'live', label: 'Redirige a eventos' },
  { from: 'edit', to: 'stream', label: 'Precarga clips y escenas' },
  { from: 'design', to: 'edit', label: 'Exporta assets y componentes' },
  { from: 'design', to: 'ai', label: 'Genera variaciones visuales' },
];

const nodeById = (id: string) => nodes.find((n) => n.id === id)!;

export function Ecosystem() {
  const [active, setActive] = useState<string | null>(null);

  const activeFlows = active
    ? flows.filter((f) => f.from === active || f.to === active)
    : flows;

  const isConnected = (id: string) =>
    !active || activeFlows.some((f) => f.from === id || f.to === id);

  return (
    <section className="section-depth px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full glass text-emerald-400">
            Todo conectado
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-50">
            Ecosistema Conectado Hova
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            Cada aplicación de la suite se integra con las demás. Pasa el cursor o toca una
            tarjeta para ver cómo fluye la información entre herramientas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {nodes.map((node) => {
            const dim = active && !isConnected(node.id);
            const highlighted = active === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActive(active === node.id ? null : node.id)}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                className={
                  'group relative flex flex-col items-center text-center rounded-2xl glass card-glow depth-shadow p-5 transition-all ' +
                  (highlighted
                    ? 'border-emerald-400 bg-emerald-400/[0.06] scale-[1.03] shadow-lg shadow-emerald-400/10'
                    : dim
                      ? 'opacity-40'
                      : 'hover:border-emerald-400/30')
                }
              >
                <span
                  className={
                    'grid place-items-center h-11 w-11 rounded-xl transition-colors ' +
                    (highlighted
                      ? 'bg-emerald-400 text-neutral-950'
                      : 'bg-emerald-400/10 text-emerald-400')
                  }
                >
                  <node.icon className="h-5 w-5" />
                </span>
                <span className="mt-3 text-sm font-medium text-neutral-50">{node.name}</span>
                <span className="mt-0.5 text-xs text-neutral-400">{node.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl glass-strong depth-shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-neutral-50">
              {active ? `Flujos desde ${nodeById(active).name}` : 'Flujos de integración'}
            </h3>
          </div>

          <div className="space-y-3">
            {activeFlows.map((flow, i) => {
              const from = nodeById(flow.from);
              const to = nodeById(flow.to);
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl glass p-3">
                  <span className="grid place-items-center h-9 w-9 rounded-lg bg-emerald-400/10 text-emerald-400 shrink-0">
                    <from.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-neutral-200 shrink-0">{from.name}</span>
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/40 to-emerald-400/40" />
                    <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/40 to-emerald-400/40" />
                  </div>
                  <span className="text-sm font-medium text-neutral-200 shrink-0">{to.name}</span>
                  <span className="grid place-items-center h-9 w-9 rounded-lg bg-emerald-400/10 text-emerald-400 shrink-0">
                    <to.icon className="h-4 w-4" />
                  </span>
                </div>
              );
            })}
          </div>

          {active && (
            <p className="mt-5 text-center text-sm text-neutral-400">
              <span className="font-medium text-neutral-100">{nodeById(active).name}</span>{' '}
              se conecta con {activeFlows.length} {activeFlows.length === 1 ? 'aplicación' : 'aplicaciones'} de la suite.
            </p>
          )}

          {!active && (
            <p className="mt-5 text-center text-sm text-neutral-400">
              Selecciona una aplicación para ver sus conexiones específicas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
