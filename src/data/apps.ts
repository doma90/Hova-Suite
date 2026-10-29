import {
  Users,
  CheckSquare,
  Clapperboard,
  Radio,
  Sparkles,
  Bot,
  PenLine,
  Palette,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Category =
  | 'Productividad'
  | 'Streaming & Entretenimiento'
  | 'IA & Automatización'
  | 'Creatividad';

export type App = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: Category;
  preview: string;
  screenshots: string[];
  video: string;
  alt: string;
  features: string[];
};

export const tabs: ('Todas' | Category)[] = [
  'Todas',
  'Productividad',
  'Streaming & Entretenimiento',
  'IA & Automatización',
  'Creatividad',
];

export const apps: App[] = [
  {
    name: 'Hova Call',
    description:
      'Llamadas grupales en HD con hasta 200 participantes, grabación y transcripción en vivo.',
    icon: Users,
    href: '#',
    category: 'Productividad',
    preview:
      'https://images.pexels.com/photos/34676331/pexels-photo-34676331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/34676331/pexels-photo-34676331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15399856/pexels-photo-15399856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/4762624/4762624-sd_960_506_30fps.mp4',
    alt: 'Laptop mostrando una videollamada grupal',
    features: [
      'Hasta 200 participantes en alta definición',
      'Grabación automática en la nube',
      'Transcripción en tiempo real',
      'Compartir pantalla y pizarra colaborativa',
    ],
  },
  {
    name: 'Hova Tasks',
    description:
      'Gestiona proyectos y equipos con tableros kanban, calendarios compartidos y recordatorios inteligentes.',
    icon: CheckSquare,
    href: '#',
    category: 'Productividad',
    preview:
      'https://images.pexels.com/photos/38888656/pexels-photo-38888656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/38888656/pexels-photo-38888656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7439127/pexels-photo-7439127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/3195954/3195954-sd_960_506_30fps.mp4',
    alt: 'Tablero kanban con gráficos en pantalla',
    features: [
      'Tableros kanban, lista y calendario',
      'Calendarios compartidos entre equipos',
      'Recordatorios inteligentes por prioridad',
      'Integración con Hova Call y Hova Automate',
    ],
  },
  {
    name: 'Hova Stream',
    description:
      'Streaming de baja latencia para multitransmisiones simultáneas a todas tus plataformas.',
    icon: Clapperboard,
    href: '#',
    category: 'Streaming & Entretenimiento',
    preview:
      'https://images.pexels.com/photos/30879395/pexels-photo-30879395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/30879395/pexels-photo-30879395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/39579124/pexels-photo-39579124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/3129957/3129957-sd_960_506_30fps.mp4',
    alt: 'Configuración multimedia con monitor para streaming',
    features: [
      'Multitransmisión simultánea a varias plataformas',
      'Latencia ultra baja (< 1 s)',
      'Escenas, fuentes y atajos personalizables',
      'Estadísticas de audiencia en vivo',
    ],
  },
  {
    name: 'Hova Live',
    description:
      'Reproductor de eventos en directo con chat integrado, encuestas y monitoreo de audiencia en tiempo real.',
    icon: Radio,
    href: '#',
    category: 'Streaming & Entretenimiento',
    preview:
      'https://images.pexels.com/photos/40222599/pexels-photo-40222599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/40222599/pexels-photo-40222599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/39006385/pexels-photo-39006385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/2022395/2022395-sd_960_506_30fps.mp4',
    alt: 'Cámara profesional retransmitiendo un evento en directo',
    features: [
      'Reproductor de eventos en directo',
      'Chat y encuestas integrados',
      'Monitoreo de audiencia en tiempo real',
      'Repetición y destacados bajo demanda',
    ],
  },
  {
    name: 'Hova AI',
    description:
      'Herramientas de IA para generar texto, imágenes y código con modelos de última generación.',
    icon: Sparkles,
    href: '#',
    category: 'IA & Automatización',
    preview:
      'https://images.pexels.com/photos/16027822/pexels-photo-16027822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/16027822/pexels-photo-16027822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15863044/pexels-photo-15863044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/3196393/3196393-sd_960_506_30fps.mp4',
    alt: 'Interfaz de inteligencia artificial en pantalla',
    features: [
      'Generación de texto, imágenes y código',
      'Modelos de última generación listos para usar',
      'Plantillas y prompts guardados',
      'Asistente integrado en toda la suite',
    ],
  },
  {
    name: 'Hova Automate',
    description:
      'Crea flujos automatizados entre tus apps con disparadores, condiciones y acciones personalizables.',
    icon: Bot,
    href: '#',
    category: 'IA & Automatización',
    preview:
      'https://images.pexels.com/photos/4955393/pexels-photo-4955393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/4955393/pexels-photo-4955393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6190327/pexels-photo-6190327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/3129957/3129957-sd_960_506_30fps.mp4',
    alt: 'Código de automatización en pantalla',
    features: [
      'Flujos visuales sin programar',
      'Disparadores, condiciones y acciones',
      'Conecta todas las apps de la suite',
      'Plantillas de automatización listas',
    ],
  },
  {
    name: 'Hova Edit',
    description:
      'Editores de vídeo, audio e imagen con línea de tiempo profesional y soporte multicapa.',
    icon: PenLine,
    href: '#',
    category: 'Creatividad',
    preview:
      'https://images.pexels.com/photos/39694504/pexels-photo-39694504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/39694504/pexels-photo-39694504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30591531/pexels-photo-30591531.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/2022395/2022395-sd_960_506_30fps.mp4',
    alt: 'Espacio de trabajo de edición de vídeo con monitores',
    features: [
      'Edición de vídeo, audio e imagen',
      'Línea de tiempo multicapa profesional',
      'Corrección de color y efectos integrados',
      'Exportación en cualquier formato',
    ],
  },
  {
    name: 'Hova Design',
    description:
      'Diseño vectorial y prototipado interactivo con bibliotecas de componentes y modo colaborativo.',
    icon: Palette,
    href: '#',
    category: 'Creatividad',
    preview:
      'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [
      'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9281786/pexels-photo-9281786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    video: 'https://videos.pexels.com/video-files/3196393/3196393-sd_960_506_30fps.mp4',
    alt: 'Pantalla mostrando trabajo de diseño web',
    features: [
      'Diseño vectorial y prototipado interactivo',
      'Bibliotecas de componentes compartidos',
      'Edición colaborativa en tiempo real',
      'Exportación a código y assets',
    ],
  },
];
