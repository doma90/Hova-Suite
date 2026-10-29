import { useState, useCallback } from 'react';
import { CreditCard, Bitcoin, Check, ShieldCheck, Copy, QrCode } from 'lucide-react';

type PayTab = 'Tradicional' | 'Cripto';

const plans = [
  {
    name: 'Suite Esencial',
    blurb: '4 apps a elegir · licencia perpetua',
    price: 149,
    features: ['4 aplicaciones de la suite', 'Actualizaciones de por vida', 'Soporte por correo'],
  },
  {
    name: 'Suite Completa',
    blurb: 'Las 8 apps · licencia perpetua',
    price: 299,
    featured: true,
    features: ['Las 8 aplicaciones incluidas', 'Actualizaciones de por vida', 'Soporte prioritario', 'Plantillas y assets premium'],
  },
  {
    name: 'Equipo',
    blurb: 'Suite completa · hasta 5 miembros',
    price: 499,
    features: ['Hasta 5 miembros', 'Panel de administración', 'Licencias transferibles', 'Soporte dedicado'],
  },
] as const;

const CRYPTO_DISCOUNT = 0.1;

const WALLET_ADDRESS = 'TXh8kP2nQvR7mY9wL3sF4dJ6cB1aZ5eH0g';

const QR_MODULES = 21;
const QR_PATTERN = [
  '1111111010101001111111',
  '1000001001000101000001',
  '1011101010010101011101',
  '1011101001101101011101',
  '1011101011001001011101',
  '1000001011010101000001',
  '1111111010101011111111',
  '0000000011011000000000',
  '1011011010010101100110',
  '0100100101101101010101',
  '1101101010001001101011',
  '0010101000110100011001',
  '1010110110010101011010',
  '0100101001001100101101',
  '0000000011101010110011',
  '1111111000100101010101',
  '1000001011010101001101',
  '1011101000101101010010',
  '1011101011100101001110',
  '1011101001101010110001',
  '1000001010100101001100',
].map((row) => row.split('').map((c) => c === '1'));

export function Pricing() {
  const [tab, setTab] = useState<PayTab>('Tradicional');
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(() => {
    navigator.clipboard?.writeText(WALLET_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className="section-depth px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full glass text-emerald-400">
            Precios y licencias
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-50">
            Paga una vez, úsalo para siempre
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            Sin suscripciones ni recargos mensuales. Elige el método de pago que prefieras.
            Pagar con USDT incluye un 10% de descuento automático.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full glass p-1">
            <button
              onClick={() => setTab('Tradicional')}
              className={
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ' +
                (tab === 'Tradicional'
                  ? 'bg-emerald-400 text-neutral-950'
                  : 'text-neutral-400 hover:text-neutral-100')
              }
            >
              <CreditCard className="h-4 w-4" />
              Pago Tradicional
            </button>
            <button
              onClick={() => setTab('Cripto')}
              className={
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ' +
                (tab === 'Cripto'
                  ? 'bg-emerald-400 text-neutral-950'
                  : 'text-neutral-400 hover:text-neutral-100')
              }
            >
              <Bitcoin className="h-4 w-4" />
              Pago Cripto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const isCrypto = tab === 'Cripto';
            const finalPrice = isCrypto ? Math.round(plan.price * (1 - CRYPTO_DISCOUNT)) : plan.price;
            return (
              <div
                key={plan.name}
                className={
                  'relative flex flex-col rounded-2xl p-6 card-glow depth-shadow transition-colors ' +
                  (plan.featured
                    ? 'glass-strong glow-featured'
                    : 'glass glow-border')
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-400 text-neutral-950">
                    Más popular
                  </span>
                )}
                <h3 className="font-semibold text-neutral-50">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{plan.blurb}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-neutral-50">
                    ${finalPrice}
                  </span>
                  <span className="mb-1 text-sm text-neutral-500">USD</span>
                </div>

                {isCrypto ? (
                  <p className="mt-1 text-xs text-emerald-400 font-medium">
                    Ahorras ${plan.price - finalPrice} con USDT
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-neutral-500">Pago único · licencia perpetua</p>
                )}

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-neutral-500">
                  {isCrypto ? (
                    <>
                      <Bitcoin className="h-3.5 w-3.5" />
                      <span>USDT (TRC-20 / ERC-20)</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Tarjeta / PayPal</span>
                    </>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Check className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={
                    'mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium transition-colors ' +
                    (plan.featured
                      ? 'bg-emerald-400 text-neutral-950 hover:bg-emerald-300'
                      : 'glass text-neutral-100 hover:border-emerald-400/30')
                  }
                >
                  {isCrypto ? 'Pagar con USDT' : 'Comprar ahora'}
                </button>
              </div>
            );
          })}
        </div>

        {tab === 'Cripto' && (
          <div className="mt-8 rounded-2xl glass-strong depth-shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="shrink-0 rounded-xl glass p-3">
                <div className="grid" style={{ gridTemplateColumns: `repeat(${QR_MODULES}, 1fr)` }}>
                  {QR_PATTERN.flatMap((row, r) =>
                    row.map((on, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={on ? 'bg-neutral-100' : 'bg-transparent'}
                        style={{ width: 5, height: 5 }}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-100">
                  <Bitcoin className="h-4 w-4 text-emerald-400" />
                  <span>Dirección de billetera USDT</span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  Red TRC-20 · Envía el monto exacto y envía el comprobante a soporte para activar tu licencia.
                </p>

                <div className="mt-3 flex items-stretch gap-2">
                  <code className="flex-1 truncate rounded-lg glass px-3 py-2.5 text-xs text-neutral-300 font-mono">
                    {WALLET_ADDRESS}
                  </code>
                  <button
                    onClick={copyAddress}
                    className={
                      'inline-flex items-center gap-2 px-4 rounded-lg text-sm font-medium transition-colors shrink-0 ' +
                      (copied
                        ? 'bg-emerald-400 text-neutral-950'
                        : 'bg-neutral-100 text-neutral-900 hover:opacity-90')
                    }
                    aria-label="Copiar dirección"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Escanea el código QR o copia la dirección manualmente</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Garantía de 30 días · Reembolso completo si no quedas satisfecho</span>
        </div>
      </div>
    </section>
  );
}
