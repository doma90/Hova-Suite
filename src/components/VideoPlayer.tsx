import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';

type VideoPlayerProps = {
  src: string;
  poster?: string;
};

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setDuration(video.duration);
      setLoading(false);
    };
    const onTime = () => setProgress(video.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * duration;
  };

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="relative w-full aspect-video bg-neutral-950 rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {loading && (
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <Loader2 className="h-8 w-8 text-white/70 animate-spin" />
        </div>
      )}

      <div
        className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity"
        style={{ opacity: playing && !loading ? 0 : 1 }}
      >
        <span className="grid place-items-center h-14 w-14 rounded-full bg-neutral-950/60 text-white pointer-events-none">
          {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
        </span>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/90 to-transparent px-3 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          onClick={onSeek}
          className="group/seek h-1.5 w-full rounded-full bg-white/20 cursor-pointer"
        >
          <div
            className="h-full rounded-full bg-emerald-400 relative"
            style={{ width: `${pct}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3 w-3 rounded-full bg-emerald-400 opacity-0 group-hover/seek:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-white">
          <button
            onClick={togglePlay}
            className="grid place-items-center h-8 w-8 rounded-full hover:bg-white/10 transition-colors"
            aria-label={playing ? 'Pausar' : 'Reproducir'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
          </button>

          <div className="flex items-center gap-2 text-xs tabular-nums">
            <span>{formatTime(progress)}</span>
            <span className="text-white/40">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <button
            onClick={toggleMute}
            className="grid place-items-center h-8 w-8 rounded-full hover:bg-white/10 transition-colors"
            aria-label={muted ? 'Activar audio' : 'Silenciar'}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
