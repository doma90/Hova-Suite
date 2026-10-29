import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AppsGrid } from '@/components/AppsGrid';
import { WhyHova } from '@/components/WhyNexora';
import { Pricing } from '@/components/Pricing';
import { Ecosystem } from '@/components/Ecosystem';
import { Footer } from '@/components/Footer';
import { AppModal } from '@/components/AppModal';
import { apps, type App } from '@/data/apps';

export default function App() {
  const [selected, setSelected] = useState<App | null>(null);

  const openModal = useCallback((app: App) => setSelected(app), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className="relative min-h-screen text-neutral-100 antialiased overflow-x-hidden">
      {/* Fixed fullscreen gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #030712 0%, #060d1c 30%, #0a1226 60%, #0f172a 100%)',
        }}
      />

      {/* Ambient glow layers over gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vh] rounded-full blur-[120px] opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.25), transparent 70%)' }}
        />
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vh] rounded-full blur-[130px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)' }}
        />
        <div className="absolute bottom-[-15%] left-[25%] w-[55vw] h-[55vh] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.15), transparent 70%)' }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero onShowApps={() => openModal(apps[0])} />
          <AppsGrid onSelect={openModal} />
          <WhyHova />
          <Pricing />
          <Ecosystem />
        </main>
        <Footer />
        <AppModal app={selected} onClose={closeModal} />
      </div>
    </div>
  );
}
