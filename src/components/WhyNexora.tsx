import { Check, X, ShieldCheck, BadgeDollarSign, Infinity as InfinityIcon } from 'lucide-react';

type Row = {
  feature: string;
  nexora: boolean | string;
  others: boolean | string;
};

const rows: Row[] = [
  { feature: 'Licencias perpetuas', nexora: true, others: false },
  { feature: 'Sin comisiones por venta', nexora: true, others: false },
  { feature: 'Sin comisiones de tienda', nexora: true, others: false },
  { feature: 'Actualizaciones incluidas', nexora: 'De por vida', others: 'Solo durante la suscripción' },
  { feature: 'Pago mensual recurrente', nexora: false, others: true },
  { feature: 'Tasas por publicación', nexora: false, others: true },
  { feature: 'Límite de descargas', nexora: false, others: 'Impuesto por plan' },
  { feature: 'Propiedad del software', nexora: 'Permanente', others: 'Mientras pagues' },
];

const highlights = [
  { icon: ShieldCheck, title: 'Tuyo para siempre', description: 'Compras una vez y la app es tuya. Sin renovaciones forzosas ni cortes de servicio.' },
  { icon: BadgeDollarSign, title: 'Sin comisiones ocultas', description: 'Cero tasas de tienda ni porcentajes por venta. Lo que ingresas es tuyo.' },
  { icon: InfinityIcon, title: 'Valor a largo plazo', description: 'Paga una vez hoy, recibe actualizaciones para siempre. Predecible y sin sorpresas.' },
];

export function WhyHova() {
  return (
    <section className="section-depth px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full glass text-emerald-400">
            Compara y decide
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-50">
            ¿Por qué Hova Suite?
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            A diferencia de las suscripciones mensuales y las tasas de las tiendas, Hova te ofrece
            licencias perpetuas sin comisiones. Pagas una vez y es tuyo para siempre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl glass card-glow depth-shadow p-5">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-emerald-400/10 text-emerald-400">
                <h.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-medium text-neutral-50">{h.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl glass-strong depth-shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left font-medium px-5 py-4 text-neutral-400">Característica</th>
                <th className="px-5 py-4 min-w-[140px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-emerald-400 text-neutral-950">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-semibold text-neutral-50">Hova Suite</span>
                    <span className="text-xs text-emerald-400">Licencia perpetua</span>
                  </div>
                </th>
                <th className="px-5 py-4 min-w-[140px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-white/10 text-neutral-400">
                      <X className="h-4 w-4" />
                    </span>
                    <span className="font-semibold text-neutral-300">Suscripción tradicional</span>
                    <span className="text-xs text-neutral-500">Pago mensual</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                  <td className="px-5 py-3.5 font-medium text-neutral-200">{row.feature}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={row.nexora} positive />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={row.others} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Cell({ value, positive }: { value: boolean | string; positive?: boolean }) {
  if (typeof value === 'string') {
    return (
      <span className={positive ? 'text-emerald-400 font-medium' : 'text-neutral-400'}>
        {value}
      </span>
    );
  }
  return value ? (
    <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-emerald-400/15 text-emerald-400">
      <Check className="h-4 w-4" />
    </span>
  ) : (
    <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-white/5 text-neutral-500">
      <X className="h-3.5 w-3.5" />
    </span>
  );
}
