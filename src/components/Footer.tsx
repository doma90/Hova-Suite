import { useState, useEffect, useRef } from 'react';
import { X, Lock, ShieldCheck, Building2, Calculator, TrendingUp, Coins, Sparkles, ArrowLeft, Percent } from 'lucide-react';

const footerLinks = [
  { title: 'Producto', links: ['Aplicaciones', 'Precios y licencias', 'Ecosistema conectado', 'Novedades', 'Estado del servicio'] },
  { title: 'Recursos', links: ['Documentación', 'Centro de ayuda', 'Guías de inicio', 'Comunidad', 'Blog'] },
  { title: 'Empresa', links: ['Sobre Hova', 'Trabaja con nosotros', 'Partners', 'Prensa', 'Contacto'] },
  { title: 'Legal', links: ['Privacidad', 'Términos de servicio', 'Licencias', 'Cookies', 'Seguridad'] },
] as const;

export function Footer() {
  const [pinOpen, setPinOpen] = useState(false);

  return (
    <footer className="relative z-10 glass-strong px-6 pt-14 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-neutral-100">
              <span className="grid place-items-center h-8 w-8 rounded-lg bg-emerald-400 text-neutral-950">
                <Building2 className="h-4 w-4" />
              </span>
              <span>Hova Suite</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 max-w-xs leading-relaxed">
              Una suite de aplicaciones integradas con licencia perpetua. Pagas una vez, es tuyo para siempre.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-neutral-200">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">© 2026 Hova Suite. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">Privacidad</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">Términos</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">Contacto</a>
            <button
              onClick={() => setPinOpen(true)}
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
            >
              Acceso Empresa
            </button>
          </div>
        </div>
      </div>

      {pinOpen && <PinModal onClose={() => setPinOpen(false)} />}
    </footer>
  );
}

function PinModal({ onClose }: { onClose: () => void }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    inputsRef.current[0]?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...pin];
    next[i] = digit;
    setPin(next);
    setError(false);
    if (digit && i < 3) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4).split('');
    if (digits.length > 0) {
      const next = ['', '', '', ''];
      digits.forEach((d, idx) => (next[idx] = d));
      setPin(next);
      inputsRef.current[Math.min(digits.length, 3)]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.some((d) => !d)) return;
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setLoading(false);
      if (pin.join('') === '1234') {
        setSuccess(true);
      } else {
        setError(true);
        setPin(['', '', '', '']);
        inputsRef.current[0]?.focus();
      }
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Acceso empresa"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />

      <div className={"relative w-full rounded-2xl glass-strong depth-shadow-lg animate-[scaleIn_0.2s_ease-out] transition-all duration-300 " + (success ? "max-w-2xl max-h-[85vh] overflow-y-auto" : "max-w-sm")}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-white/5 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          {success ? (
            <AdminPanel onClose={onClose} />
          ) : (
            <>
              <div className="text-center">
                <span className="grid place-items-center h-12 w-12 mx-auto rounded-full bg-emerald-400/10 text-emerald-400">
                  <Lock className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-50">Acceso Empresa</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Introduce el PIN de 4 dígitos para acceder al panel privado.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex justify-center gap-3" onPaste={handlePaste}>
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputsRef.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className={
                        'h-14 w-12 text-center text-xl font-semibold rounded-xl glass text-neutral-50 focus:outline-none transition-colors ' +
                        (error
                          ? 'border-red-400/60 focus:border-red-500'
                          : 'focus:border-emerald-400')
                      }
                      aria-label={`Dígito ${i + 1}`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="mt-3 text-center text-sm text-red-400">
                    PIN incorrecto. Inténtalo de nuevo.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || pin.some((d) => !d)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-neutral-950 font-medium hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verificando...' : 'Acceder'}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-neutral-500">
                ¿No tienes el PIN? Solicítalo a tu administrador de empresa.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const BUCKETS = [
  { key: 'ops', label: 'Operaciones', pct: 80, icon: TrendingUp, iconBg: 'bg-emerald-400/15 text-emerald-400', barBg: 'bg-emerald-400' },
  { key: 'paxg', label: 'Reserva PAXG (Oro)', pct: 10, icon: Coins, iconBg: 'bg-amber-400/15 text-amber-400', barBg: 'bg-amber-400' },
  { key: 'growth', label: 'Fondo de Crecimiento', pct: 10, icon: Sparkles, iconBg: 'bg-blue-400/15 text-blue-400', barBg: 'bg-blue-400' },
] as const;

function formatCurrency(n: number): string {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const [capital, setCapital] = useState('100000');
  const total = parseFloat(capital) || 0;
  const [back, setBack] = useState(false);

  if (back) {
    return (
      <div className="text-center py-4">
        <span className="grid place-items-center h-14 w-14 mx-auto rounded-full bg-emerald-400/15 text-emerald-400">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-neutral-50">Sesión cerrada</h3>
        <p className="mt-2 text-sm text-neutral-400">Has salido del panel empresarial.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-5">
        <span className="grid place-items-center h-10 w-10 rounded-xl bg-emerald-400/10 text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-neutral-50">Panel de Gestión Interna</h3>
          <p className="text-xs text-neutral-400">Distribución de capital · Hova Suite</p>
        </div>
        <button
          onClick={() => setBack(true)}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Salir
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-4 w-4 text-emerald-400" />
        <h4 className="text-sm font-semibold text-neutral-200">Calculadora de Distribución de Capital</h4>
      </div>

      <div className="rounded-xl glass p-4 mb-5">
        <label className="block text-xs font-medium text-neutral-400 mb-2">
          Capital total disponible (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-lg">$</span>
          <input
            type="text"
            inputMode="decimal"
            value={capital}
            onChange={(e) => setCapital(e.target.value.replace(/[^0-9.]/g, ''))}
            className="w-full pl-7 pr-4 py-3 text-lg font-semibold rounded-lg glass text-neutral-50 focus:outline-none focus:border-emerald-400 transition-colors"
            placeholder="100,000.00"
          />
        </div>
        <div className="flex gap-2 mt-3">
          {['50,000', '100,000', '500,000', '1,000,000'].map((preset) => (
            <button
              key={preset}
              onClick={() => setCapital(preset.replace(/,/g, ''))}
              className="text-xs px-3 py-1.5 rounded-full glass text-neutral-400 hover:border-emerald-400/40 hover:text-emerald-400 transition-colors"
            >
              ${preset}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {BUCKETS.map((bucket) => {
          const amount = (total * bucket.pct) / 100;
          const pctTotal = total > 0 ? bucket.pct : 0;
          return (
            <div key={bucket.key} className="rounded-xl glass p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`grid place-items-center h-9 w-9 rounded-lg ${bucket.iconBg}`}>
                    <bucket.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-100">{bucket.label}</p>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Percent className="h-3 w-3" />
                      <span>{bucket.pct}% del capital</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-neutral-50">${formatCurrency(amount)}</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bucket.barBg} transition-all duration-500`}
                  style={{ width: `${pctTotal}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl glass p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">Total distribuido</span>
          <span className="text-lg font-semibold text-neutral-50">${formatCurrency(total)}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-neutral-500">100% asignado automáticamente</span>
          <span className="text-xs text-emerald-400 font-medium">Operativo</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-neutral-500">
        <ShieldCheck className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <p>La distribución sigue la política interna: 80% Operaciones, 10% Reserva PAXG (Oro) y 10% Fondo de Crecimiento. Los valores son referenciales.</p>
      </div>
    </div>
  );
}
