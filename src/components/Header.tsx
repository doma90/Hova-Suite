import { Layers, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/theme/ThemeProvider';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-strong">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-neutral-100">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-emerald-400 text-neutral-950">
            <Layers className="h-5 w-5" />
          </span>
          <span>Hova Suite</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
          <a href="#apps" className="hover:text-white transition-colors">Aplicaciones</a>
          <a href="#" className="hover:text-white transition-colors">Características</a>
          <a href="#" className="hover:text-white transition-colors">Soporte</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="grid place-items-center h-9 w-9 rounded-full glass text-neutral-300 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#"
            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full glass text-neutral-100 hover:border-emerald-400/30 transition-colors"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    </header>
  );
}
