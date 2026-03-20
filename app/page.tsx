"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/* ─── Assets ─── */
const heroWalkway = "https://framerusercontent.com/images/jJZW7uwTksfHCLIrIzPYHn8sk.png?height=10259&width=1151";
const palaceNight = "https://framerusercontent.com/images/eel80jhNw27NiwQJozHWWRMaEs.png?height=2043&width=596";
const sageArch = "https://framerusercontent.com/images/z8fNGgEf83GUW8GN7ddabomNq0.png?height=952&width=774";
const floralLeft = "https://framerusercontent.com/images/FLSOOveTOLX34LMuvOegzZoZ2eo.png?height=1166&width=1094";
const floralRight = "https://framerusercontent.com/images/ndc7VHWOkcPiELsDteUplHBg.png?height=1174&width=1103";
const creamFrame = "https://framerusercontent.com/images/54JwjUrKR8txnFhN4dFmme3FzoQ.png?height=758&scale-down-to=512&width=506";
const greenTexture = "https://framerusercontent.com/images/munXckNtNDlAiOMLLgrVsV1o.png?height=2048&width=1350";
const pinkTexture = "https://framerusercontent.com/images/CxMq9eNVYFWeipRkOH7L6BF7EV4.png?height=3716&width=1350";
const carBlue = "https://framerusercontent.com/images/T1dORVl8kMLXNd7ShMJWzCpoHtM.png?height=431&width=629";
const carVintage = "https://framerusercontent.com/images/O07fRruEj5em3moPWz2blxIGqRI.png?height=779&width=520";
const carTeal = "https://framerusercontent.com/images/22xXcSSm9sQYXLb74vUWOaNwXY.png?height=738&width=738";
const couple1 = "https://framerusercontent.com/images/fKFg2vQEmI70QHKfOSr54pE7KQ4.jpeg?height=1349&scale-down-to=1024&width=1080";
const couple2 = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
const couple3 = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80";
const lanternImg = "https://framerusercontent.com/images/DdFrH1xuj9wKnCb1V2cCwhyUujQ.png?width=240&height=382";

const galleryA = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21d?auto=format&fit=crop&w=1200&q=80",
];

const galleryB = [
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516589091380-5d60152b9d25?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
];

const events = [
  { title: "Mehendi", date: "Sunday, April 19th 2026", venue: "Hotel Anntilia Inn", time: "4pm Onwards" },
  { title: "Haldi", date: "Monday, April 20th 2026", venue: "Hotel Anntilia Inn", time: "10am Onwards" },
  { title: "Cocktail", date: "Monday, April 20th 2026", venue: "Hotel Anntilia Inn", time: "7pm Onwards" },
  { title: "Engagement", date: "Monday, April 20th 2026", venue: "Hotel Anntilia Inn", time: "11am Onwards" },
  { title: "Shaadi", date: "Monday, April 20th 2026", venue: "Hotel Anntilia Inn", time: "6pm Onwards" },
  { title: "Reception", date: "Tuesday, April 21st 2026", venue: "Hotel Anntilia Inn", time: "7pm Onwards" },
];

const knowItems = [
  { title: "Hashtag", text: "While posting photos on social media please use the hashtag — #RishAmisha2026", icon: "#" },
  { title: "Weather", text: "Mostly sunny with temperature reaching up to 32°C at the venue", icon: "☀" },
  { title: "Accommodation", text: "We recommend staying at Hotel Anntilia Inn — contact the front desk for blocked room rates", icon: "✦" },
  { title: "Parking", text: "Valet parking for all our guests will be available at the venue", icon: "P" },
];

const routeUrl = "https://maps.google.com/?q=Hotel+Anntilia+Inn";
const whatsappUrl = "https://wa.me/919999999999?text=Hello%2C%20I%20would%20love%20to%20RSVP%20for%20Rishav%20%26%20Amisha%27s%20wedding";
const instagramUrl = "https://instagram.com";

// 🎵 Replace this with your actual audio file URL (MP3 / OGG hosted on any CDN or storage bucket)
const WEDDING_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";



/* ─── Types ─── */
interface Countdown { days: string; hours: string; minutes: string; seconds: string; }

function getCountdown(targetDate: Date): Countdown {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff / 3600000) % 24)),
    minutes: pad(Math.floor((diff / 60000) % 60)),
    seconds: pad(Math.floor((diff / 1000) % 60)),
  };
}

/* ─── Lantern column — one swaying lantern in a vertical strip ─── */
function LanternItem({ delay, size, swayAmp, speed, topOffset }: { delay: number; size: number; swayAmp: number; speed: number; topOffset: number }) {
  return (
    <motion.div
      style={{ marginTop: topOffset, width: size, flexShrink: 0 }}
      animate={{ x: [0, swayAmp, -swayAmp * 0.6, swayAmp * 0.4, 0], rotate: [0, 3, -2.5, 1.5, 0] }}
      transition={{ duration: 3.5 + speed * 2.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <img src={lanternImg} alt="" style={{ width: "100%", opacity: 0.88, filter: "drop-shadow(0 6px 14px rgba(200,140,40,0.38))" }} />
    </motion.div>
  );
}

/* ─── Full-height lantern columns pinned to left / right of the page ─── */
function LanternColumns() {
  // Each column: array of { size, delay, speed, swayAmp, gap } — gap = spacing before next lantern
  const leftCol = [
    { size: 52, delay: 0,   speed: 1.0, swayAmp: 16, topOffset: 80  },
    { size: 38, delay: 0.8, speed: 1.3, swayAmp: 10, topOffset: 120 },
    { size: 58, delay: 0.3, speed: 0.9, swayAmp: 20, topOffset: 160 },
    { size: 42, delay: 1.2, speed: 1.2, swayAmp: 12, topOffset: 100 },
    { size: 50, delay: 0.5, speed: 1.1, swayAmp: 18, topOffset: 140 },
    { size: 36, delay: 1.5, speed: 1.4, swayAmp: 8,  topOffset: 180 },
    { size: 54, delay: 0.2, speed: 1.0, swayAmp: 15, topOffset: 120 },
    { size: 44, delay: 0.9, speed: 1.3, swayAmp: 11, topOffset: 100 },
  ];
  const rightCol = [
    { size: 46, delay: 0.4, speed: 1.1, swayAmp: 14, topOffset: 60  },
    { size: 60, delay: 0,   speed: 0.9, swayAmp: 20, topOffset: 150 },
    { size: 36, delay: 1.0, speed: 1.4, swayAmp: 9,  topOffset: 130 },
    { size: 54, delay: 0.6, speed: 1.0, swayAmp: 18, topOffset: 110 },
    { size: 40, delay: 1.3, speed: 1.2, swayAmp: 11, topOffset: 170 },
    { size: 56, delay: 0.2, speed: 0.95,swayAmp: 17, topOffset: 90  },
    { size: 38, delay: 1.1, speed: 1.35,swayAmp: 10, topOffset: 150 },
    { size: 50, delay: 0.7, speed: 1.05,swayAmp: 15, topOffset: 130 },
  ];

  const colStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 72,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 20,
    overflow: "hidden",
  };

  return (
    <>
      <div className="lantern-col" style={{ ...colStyle, left: 0 }}>
        {leftCol.map((l, i) => <LanternItem key={i} {...l} />)}
      </div>
      <div className="lantern-col" style={{ ...colStyle, right: 0 }}>
        {rightCol.map((l, i) => <LanternItem key={i} {...l} />)}
      </div>
    </>
  );
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, className = "", delay = 0, amount = 0.2 }: { children: ReactNode; className?: string; delay?: number; amount?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger text chars ─── */
function SplitTitle({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Event card ─── */
function EventCard({ item, index }: { item: typeof events[0]; index: number }) {
  return (
    <Reveal delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="event-card"
        style={{ backgroundImage: `url(${sageArch})` }}
      >
        <div className="event-card-overlay">
          <div className="event-florals">
            <motion.img src={floralLeft} alt="" className="event-flower left"
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img src={floralRight} alt="" className="event-flower right"
              animate={{ rotate: [0, -4, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="event-content">
            <div className="event-title">{item.title}</div>
            <div className="event-date">{item.date}</div>
            <div className="event-venue">{item.venue}</div>
            <div className="event-time">{item.time}</div>
            <motion.a
              href={routeUrl} target="_blank" rel="noreferrer" className="route-btn"
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            >
              See the route
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─── Gallery strip ─── */
function GalleryStrip({ images, index, onPrev, onNext }: { images: string[]; index: number; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="gallery-strip">
      <motion.button className="gallery-arrow" onClick={onPrev} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>‹</motion.button>
      <AnimatePresence mode="wait">
        <motion.div key={index} className="gallery-window"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <img src={images[index]} alt="Wedding gallery" className="gallery-image" />
        </motion.div>
      </AnimatePresence>
      <motion.button className="gallery-arrow" onClick={onNext} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>›</motion.button>
    </div>
  );
}

/* ─── Floating petals ─── */
function FloatingPetals() {
  const petals = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i, x: `${Math.random() * 90 + 5}%`, delay: Math.random() * 8, duration: 8 + Math.random() * 6,
  })), []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {petals.map(p => (
        <motion.div key={p.id} style={{ position: "absolute", top: "-30px", left: p.x, fontSize: 14, opacity: 0.4 }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 360], x: [0, 20, -15, 10, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Audio Player ─── */
function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Auto-play on first user interaction with the page
  useEffect(() => {
    const tryPlay = () => {
      if (!started && audioRef.current) {
        audioRef.current.volume = 0.45;
        audioRef.current.play().then(() => {
          setPlaying(true);
          setStarted(true);
        }).catch(() => {});
      }
    };
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });
    // Also attempt autoplay immediately (works on some browsers)
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().then(() => { setPlaying(true); setStarted(true); }).catch(() => {});
    }
    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); setStarted(true); }
  };

  return (
    <>
      <audio ref={audioRef} src={WEDDING_AUDIO_URL} loop preload="auto" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 999,
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(236, 224, 183, 0.92)",
          border: "1px solid rgba(110, 108, 65, 0.4)",
          backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(80, 70, 20, 0.22)",
          color: "#5a5f36", fontSize: 20,
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          // Pause icon — two bars
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="2" width="4" height="14" rx="1.5" fill="currentColor"/>
            <rect x="11" y="2" width="4" height="14" rx="1.5" fill="currentColor"/>
          </svg>
        ) : (
          // Play icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 2.5L15.5 9L4 15.5V2.5Z" fill="currentColor"/>
          </svg>
        )}
        {/* Animated rings when playing */}
        {playing && (
          <motion.span style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1.5px solid rgba(110,108,65,0.35)" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}


export default function CityWeddingInviteClone() {
  const weddingDate = useMemo(() => new Date("2026-04-20T18:00:00"), []);
  const [countdown, setCountdown] = useState(getCountdown(weddingDate));
  const [galleryIndexA, setGalleryIndexA] = useState(0);
  const [galleryIndexB, setGalleryIndexB] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroCarY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.45]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown(weddingDate)), 1000);
    return () => clearInterval(t);
  }, [weddingDate]);

  useEffect(() => {
    const tA = setInterval(() => setGalleryIndexA(p => (p + 1) % galleryA.length), 3200);
    const tB = setInterval(() => setGalleryIndexB(p => (p + 1) % galleryB.length), 3700);
    return () => { clearInterval(tA); clearInterval(tB); };
  }, []);

  return (
    <div className="page-shell">
      <AudioPlayer />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        html, body { width: 100%; overflow-x: hidden; background: #ece7d0; }
        body { font-family: Georgia, 'Times New Roman', serif; }
        a { text-decoration: none; }
        img { display: block; max-width: 100%; }

        /* ── Shell ── */
        .page-shell {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(180deg, #e7e0b9 0%, #efe7c7 28%, #e6d8bb 55%, #d8c7a7 100%);
          color: #4e5130;
          overflow-x: hidden;
          position: relative;
        }

        .invite { width: 100%; background: #ebdfbf; overflow: hidden; position: relative; }
        .container { width: min(1180px, calc(100% - 160px)); margin: 0 auto; }
        .section { position: relative; width: 100%; padding: 32px 0; overflow: hidden; }

        /* ── Hero ── */
        .hero {
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          background-image: url(${heroWalkway});
          background-size: cover; background-position: center;
          color: #f6f0d3; text-align: center; position: relative; overflow: hidden;
        }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,10,0.1), rgba(10,10,10,0.38)); }
        .hero-inner {
          position: relative; z-index: 2; width: min(100%, 820px);
          padding: 60px 16px 190px;
        }
        .brand-pill {
          display: inline-block; margin-bottom: 28px; padding: 10px 18px;
          background: rgba(233,224,192,0.25); border: 1px solid rgba(255,255,255,0.32);
          border-radius: 999px; font-size: 11px; letter-spacing: 0.24em;
          text-transform: uppercase; backdrop-filter: blur(10px);
        }
        .hero-sub { font-size: 13px; letter-spacing: 0.38em; text-transform: uppercase; opacity: 0.9; margin-bottom: 22px; }
        .hero-name { font-size: clamp(44px, 9vw, 96px); line-height: 0.95; letter-spacing: 0.12em; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .hero-weds { font-size: clamp(24px, 5vw, 48px); line-height: 1; margin: 16px 0; letter-spacing: 0.18em; text-transform: uppercase; }
        .hero-divider { width: 1px; height: 80px; background: rgba(247,240,221,0.65); margin: 18px auto; }
        .hero-date { margin-top: 20px; font-size: clamp(13px, 1.8vw, 17px); letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.94; }
        .floating-car {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          width: min(38vw, 480px); min-width: 200px; z-index: 3;
          filter: drop-shadow(0 16px 24px rgba(20,18,10,0.3));
        }

        /* ── Invite panel ── */
        .invite-panel {
          background: url(${greenTexture}); background-size: cover; background-position: center;
          text-align: center; color: #576137; min-height: 100svh; display: flex; align-items: center;
        }
        .invite-panel-inner {
          width: min(1100px, calc(100% - 32px)); margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center; padding: 60px 0;
        }
        .invite-copy-block { text-align: left; }
        .small-om { font-size: 28px; margin-bottom: 16px; }
        .eyebrow { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }
        .blessing { font-size: 15px; line-height: 1.8; margin: 8px 0 6px; }
        .divider { font-size: 18px; margin: 4px 0 6px; }
        .invite-title { font-size: clamp(28px, 4vw, 58px); line-height: 1.02; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 12px; }
        .invite-copy { font-size: 14px; line-height: 1.78; margin-top: 10px; max-width: 520px; }
        .couple-names { font-size: clamp(32px, 5vw, 72px); line-height: 1.08; letter-spacing: 0.08em; text-transform: uppercase; margin: 16px 0; }
        .arch-wrap { position: relative; width: 100%; max-width: 480px; margin: 0 auto; aspect-ratio: 0.82; }
        .arch-bg, .flower-left, .flower-right { position: absolute; }
        .arch-bg { inset: 0; width: 100%; height: 100%; object-fit: contain; }
        .flower-left, .flower-right { top: 3%; width: 34%; max-width: 160px; z-index: 2; }
        .flower-left { left: -2%; }
        .flower-right { right: -2%; width: 32%; }
        .invite-text {
          position: absolute; inset: 18% 13% 12%; z-index: 3;
          display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
        }

        /* ── Events ── */
        .events {
          background: linear-gradient(180deg, #efe6c7 0%, #eadfbf 100%);
          min-height: 100svh; display: flex; align-items: center;
        }
        .section-title {
          text-align: center; font-size: clamp(34px, 6vw, 72px);
          line-height: 0.98; text-transform: lowercase; color: #5a5f36; margin-bottom: 12px;
        }
        .section-title .block { display: block; }
        .section-subtitle {
          text-align: center; font-size: 14px; line-height: 1.85;
          color: #707652; max-width: 580px; margin: 0 auto 28px;
        }
        .events-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;
        }
        .event-card { position: relative; min-height: 320px; background-size: cover; background-position: center; border-radius: 8px; overflow: hidden; }
        .event-card-overlay { min-height: 320px; position: relative; }
        .event-florals { position: absolute; inset: 0; pointer-events: none; }
        .event-flower { position: absolute; width: 90px; top: 14px; opacity: 0.95; }
        .event-flower.left { left: 12px; }
        .event-flower.right { right: 12px; width: 84px; }
        .event-content {
          position: relative; min-height: 320px; padding: 80px 36px 28px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #5f6940; z-index: 2;
        }
        .event-title { font-size: clamp(28px, 4vw, 46px); line-height: 1.04; margin-bottom: 10px; }
        .event-date, .event-venue, .event-time { font-size: 14px; line-height: 1.78; }

        /* ── Buttons ── */
        .route-btn, .follow-link, .whatsapp-btn {
          margin-top: 16px; display: inline-flex; align-items: center; justify-content: center;
          min-width: 140px; padding: 11px 20px; border-radius: 999px;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          transition: transform 0.25s ease, opacity 0.25s ease; cursor: pointer;
        }
        .route-btn { border: 1px solid #8b8e60; color: #5f6940; background: rgba(255,255,255,0.18); }
        .whatsapp-btn { background: #6c7a4b; color: #f5efda; border: none; }
        .follow-link { border: 1px solid #9a7a84; color: #7a5b64; background: rgba(255,255,255,0.18); }

        /* ── Map CTA ── */
        .map-cta {
          background: url(${pinkTexture}); background-size: cover; background-position: center;
          min-height: 70svh; display: flex; align-items: center; text-align: center;
        }
        .map-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px; align-items: center; }
        .map-copy { font-size: 16px; color: #7a5b64; margin-bottom: 8px; }
        .map-copy strong { display: block; font-size: clamp(30px, 5vw, 62px); letter-spacing: 0.04em; line-height: 0.96; margin-bottom: 10px; }
        .map-car { width: 100%; max-width: 340px; margin: 12px auto 0; }

        /* ── Meet ── */
        .meet {
          background: url(${greenTexture}); background-size: cover; background-position: center;
          min-height: 100svh; display: flex; align-items: center; text-align: center;
        }
        .meet-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 36px; align-items: center; }
        .meet-copy { font-size: 14px; line-height: 1.92; max-width: 700px; margin: 0 auto 20px; color: #6c7047; }
        .couple-frame { position: relative; width: 100%; max-width: 340px; aspect-ratio: 0.72; margin: 0 auto 16px; }
        .couple-border { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2; pointer-events: none; }
        .couple-photo { position: absolute; inset: 12% 17% 16%; width: 66%; height: 70%; object-fit: cover; border-radius: 110px 110px 20px 20px; }
        .gallery-strip { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 10px; margin-top: 12px; }
        .gallery-arrow { height: 44px; border-radius: 999px; border: 1px solid #8b8e60; background: rgba(255,255,255,0.22); color: #5f6940; font-size: 22px; cursor: pointer; }
        .gallery-window { height: 220px; overflow: hidden; border-radius: 20px; border: 1px solid rgba(103,110,64,0.22); }
        .gallery-image { width: 100%; height: 100%; object-fit: cover; }

        /* ── RSVP ── */
        .rsvp {
          background: linear-gradient(180deg, #f0e5c8 0%, #ece2c1 100%);
          min-height: 60svh; display: flex; align-items: center; text-align: center;
        }
        .rsvp-card {
          padding: 32px 24px; border-radius: 28px; background: rgba(255,255,255,0.3);
          border: 1px solid rgba(110,111,72,0.18); box-shadow: 0 12px 28px rgba(72,60,25,0.08);
          max-width: 500px; margin: 0 auto;
        }
        .rsvp-title { font-size: clamp(40px, 6vw, 72px); line-height: 0.95; text-transform: lowercase; color: #5a5f36; }
        .rsvp-sub { font-size: 14px; color: #6f744d; margin: 10px 0 16px; }

        /* ── Things to know ── */
        .things {
          background: url(${greenTexture}); background-size: cover; background-position: center;
          min-height: 100svh; display: flex; align-items: center;
        }
        .things-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .thing-card {
          background: rgba(250,245,226,0.44); border: 1px solid rgba(108,117,75,0.2);
          border-radius: 22px; padding: 20px 18px; color: #616944;
          box-shadow: 0 8px 20px rgba(69,61,30,0.06); min-height: 190px;
          transition: transform 0.3s ease;
        }
        .thing-icon { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #8b8e60; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 10px; }
        .thing-title { font-size: clamp(24px, 3.5vw, 40px); line-height: 1.04; margin-bottom: 8px; }
        .thing-text { font-size: 14px; line-height: 1.76; }

        /* ── Follow ── */
        .follow {
          background: url(${pinkTexture}); background-size: cover; background-position: center;
          min-height: 70svh; display: flex; align-items: center; text-align: center;
        }
        .follow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; }
        .follow-card {
          border-radius: 26px; padding: 28px 20px 22px;
          background: rgba(255,255,255,0.16); border: 1px solid rgba(134,101,112,0.2);
          max-width: 500px; margin: 0 auto;
        }
        .follow-title { font-size: clamp(34px, 5.5vw, 68px); line-height: 0.95; color: #7a5b64; margin-bottom: 10px; text-transform: lowercase; }
        .follow-sub { font-size: 14px; color: #8b6c76; margin-bottom: 12px; }
        .follow-car { width: 100%; max-width: 320px; display: block; margin: 0 auto; }

        /* ── Countdown ── */
        .countdown {
          min-height: 100svh;
          background: linear-gradient(180deg, rgba(7,20,40,0.06), rgba(7,20,40,0.18)), url(${palaceNight});
          background-size: cover; background-position: center bottom;
          color: #f0e7ca; text-align: center; display: flex; align-items: center;
        }
        .count-title { font-size: clamp(36px, 6vw, 74px); line-height: 0.96; text-transform: lowercase; margin-bottom: 18px; text-shadow: 0 2px 8px rgba(0,0,0,0.24); }
        .count-clock { display: inline-flex; gap: 8px; align-items: center; justify-content: center; font-size: clamp(22px, 4vw, 36px); letter-spacing: 0.08em; margin-bottom: 12px; flex-wrap: wrap; }
        .count-unit { min-width: clamp(60px, 8vw, 90px); padding: 12px 10px; border-radius: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(4px); }
        .count-labels { display: flex; justify-content: center; gap: 14px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8; margin-bottom: 16px; flex-wrap: wrap; }
        .count-copy { font-size: 14px; line-height: 1.86; max-width: 540px; margin: 0 auto; color: #efe4c0; }
        .footer-note { margin-top: 24px; font-size: 11px; letter-spacing: 0.08em; opacity: 0.85; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .invite-panel-inner, .meet-grid, .map-grid, .follow-grid { grid-template-columns: 1fr; }
          .invite-copy-block { text-align: center; }
          .invite-copy { margin: 0 auto; }
          .events-grid, .things-grid { grid-template-columns: 1fr; }
          .hero-inner { padding-bottom: 180px; }
          .floating-car { width: min(55vw, 360px); }
          .arch-wrap { max-width: 380px; }
          .container { width: min(1180px, calc(100% - 120px)); }
        }

        @media (max-width: 640px) {
          .container { width: calc(100% - 24px); }
          .section { padding: 24px 0; }
          .hero-inner { padding: 36px 12px 160px; }
          .floating-car { bottom: 18px; width: 74vw; min-width: 180px; }
          .event-content { padding: 76px 22px 26px; }
          .event-flower { width: 70px; }
          .gallery-window { height: 190px; }
          .gallery-strip { grid-template-columns: 38px 1fr 38px; gap: 7px; }
          .gallery-arrow { height: 38px; font-size: 20px; }
          .couple-frame { max-width: 280px; }
          .things-grid { grid-template-columns: 1fr; }
          .count-clock { gap: 6px; }
          .count-unit { min-width: clamp(52px, 18vw, 80px); padding: 10px 8px; }
        }

        @media (max-width: 500px) {
          .lantern-col { display: none; }
          .container { width: calc(100% - 24px); }
        }

        @media (max-width: 400px) {
          .hero-name { font-size: 38px; }
          .events-grid { gap: 14px; }
        }
      `}</style>

      <div className="invite" style={{ position: "relative" }}>
        <LanternColumns />

        {/* ── HERO ── */}
        <section ref={heroRef} className="section hero">
          <motion.div className="hero-overlay" style={{ opacity: heroOverlayOpacity }} />
          <motion.div style={{ scale: heroScale, position: "absolute", inset: 0, backgroundImage: `url(${heroWalkway})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <FloatingPetals />

          <div className="container">
            <motion.div className="hero-inner" style={{ y: heroTextY }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                <div className="brand-pill">City Wedding Invite</div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
                <div className="hero-sub">Save the date</div>
              </motion.div>
              <SplitTitle text="Rishav" className="hero-name" delay={0.6} />
              <motion.div className="hero-weds" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 1.0 }}>
                Weds
              </motion.div>
              <SplitTitle text="Amisha" className="hero-name" delay={1.1} />
              <motion.div className="hero-divider" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }} />
              <motion.div className="hero-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.9 }}>
                Monday, April 20th 2026 • Hotel Anntilia Inn
              </motion.div>
            </motion.div>
          </div>
          <motion.img src={carBlue} alt="Vintage wedding car" className="floating-car" style={{ y: heroCarY }}
            initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          />
        </section>

        {/* ── INVITE PANEL ── */}
        <section className="section invite-panel">
          <div className="invite-panel-inner">
            <Reveal>
              <div className="invite-copy-block">
                <motion.div className="small-om" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}>ॐ श्री गणेशाय नम</motion.div>
                <div className="eyebrow">With the heavenly blessings of</div>
                <div className="blessing">Smt. Lata Devi &amp; Sm. Kamal Kapoor</div>
                <div className="divider">——</div>
                <div className="blessing">Mrs. Reena &amp; Mr. Rajiv Kapoor</div>
                <div className="invite-title">Invite</div>
                <div className="invite-copy">You to join us in the wedding celebrations of</div>
                <div className="couple-names">Rishav<br />&amp;<br />Amisha</div>
                <div className="invite-copy">Daughter of Mrs. Priya &amp; Mr. Sanjay Sharma, on the following events.</div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="arch-wrap">
                <img src={sageArch} alt="Decorative arch" className="arch-bg" />
                <motion.img src={floralLeft} alt="" className="flower-left" animate={{ rotate: [0, 6, -6, 0], y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity }} />
                <motion.img src={floralRight} alt="" className="flower-right" animate={{ rotate: [0, -6, 6, 0], y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity }} />
                <div className="invite-text">
                  <div className="eyebrow">With the heavenly blessings of</div>
                  <div className="blessing">Smt. Lata Devi &amp; Sm. Kamal Kapoor</div>
                  <div className="divider">——</div>
                  <div className="blessing">Mrs. Reena &amp; Mr. Rajiv Kapoor</div>
                  <div className="invite-title">Invite</div>
                  <div className="invite-copy">You to join us in the celebrations of</div>
                  <div className="couple-names">Rishav<br />&amp;<br />Amisha</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section className="section events">
          <div className="container">
            <Reveal>
              <div className="section-title">
                <SplitTitle text="the wedding" delay={0} />
                <SplitTitle text="celebrations" delay={0.15} />
              </div>
              <div className="section-subtitle">A beautifully paced celebration — every event laid out with the same romantic warmth as the invitation itself.</div>
            </Reveal>
            <div className="events-grid">
              {events.map((item, i) => <EventCard key={item.title} item={item} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── MAP CTA ── */}
        <section className="section map-cta">
          <div className="container">
            <div className="map-grid">
              <Reveal>
                <div>
                  <div className="map-copy"><strong>See the route</strong>Click to open the map</div>
                  <motion.a href={routeUrl} target="_blank" rel="noreferrer" className="route-btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>Open map</motion.a>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <motion.img src={carVintage} alt="Vintage car" className="map-car"
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── MEET ── */}
        <section className="section meet">
          <div className="container">
            <div className="meet-grid">
              <Reveal>
                <div>
                  <div className="section-title" style={{ textAlign: "left" }}>
                    <SplitTitle text="meet the" delay={0} />
                    <SplitTitle text="couple" delay={0.12} />
                  </div>
                  <div className="meet-copy">We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us since our roka has been incredibly moving and has touched us both deeply. We would like to thank everyone most sincerely for their kindness — Rishav &amp; Amisha cannot wait to see you at Hotel Anntilia Inn on April 20th.</div>
                  <div className="couple-frame">
                    <img src={couple1} alt="Bride and groom" className="couple-photo" />
                    <img src={creamFrame} alt="Decorative frame" className="couple-border" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="gallery-stack">
                  <GalleryStrip images={galleryA} index={galleryIndexA}
                    onPrev={() => setGalleryIndexA(p => (p - 1 + galleryA.length) % galleryA.length)}
                    onNext={() => setGalleryIndexA(p => (p + 1) % galleryA.length)}
                  />
                  <div style={{ height: 16 }} />
                  <div className="couple-frame">
                    <img src={galleryIndexB % 2 === 0 ? couple2 : couple3} alt="Bride and groom portrait" className="couple-photo" />
                    <img src={creamFrame} alt="Decorative frame" className="couple-border" />
                  </div>
                  <GalleryStrip images={galleryB} index={galleryIndexB}
                    onPrev={() => setGalleryIndexB(p => (p - 1 + galleryB.length) % galleryB.length)}
                    onNext={() => setGalleryIndexB(p => (p + 1) % galleryB.length)}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section className="section rsvp">
          <div className="container">
            <Reveal>
              <motion.div className="rsvp-card" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <div className="rsvp-title">
                  <SplitTitle text="please" delay={0} />
                  <SplitTitle text="rsvp" delay={0.15} />
                </div>
                <div className="rsvp-sub">Click to message us on WhatsApp</div>
                <motion.a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-btn" whileHover={{ scale: 1.06, backgroundColor: "#5a6840" }} whileTap={{ scale: 0.96 }}>
                  Message on WhatsApp
                </motion.a>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ── THINGS TO KNOW ── */}
        <section className="section things">
          <div className="container">
            <Reveal>
              <div className="section-title"><SplitTitle text="things to know" delay={0} /></div>
              <div className="section-subtitle">To help you feel at ease and enjoy every moment, we've gathered a few thoughtful details to know before the big day.</div>
            </Reveal>
            <div className="things-grid">
              {knowItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.07}>
                  <motion.div className="thing-card" whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <div className="thing-icon">{item.icon}</div>
                    <div className="thing-title">{item.title}</div>
                    <div className="thing-text">{item.text}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOLLOW ── */}
        <section className="section follow">
          <div className="container">
            <div className="follow-grid">
              <Reveal>
                <div className="follow-card">
                  <div className="follow-title">
                    <SplitTitle text="follow the" delay={0} />
                    <SplitTitle text="action" delay={0.12} />
                  </div>
                  <div className="follow-sub">Click to open our Instagram page</div>
                  <motion.a href={instagramUrl} target="_blank" rel="noreferrer" className="follow-link" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                    Open Instagram
                  </motion.a>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <motion.img src={carTeal} alt="Vintage blue car" className="follow-car"
                  animate={{ y: [0, -12, 0], rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── COUNTDOWN ── */}
        <section className="section countdown">
          <div className="container">
            <Reveal>
              <div className="count-title">
                <SplitTitle text="the countdown begins" delay={0} />
              </div>
              <div className="count-clock">
                {[{ val: countdown.days, lbl: "Days" }, { val: countdown.hours, lbl: "Hours" }, { val: countdown.minutes, lbl: "Min" }, { val: countdown.seconds, lbl: "Sec" }].map((u, i) => (
                  <motion.div key={u.lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    <motion.div className="count-unit"
                      key={u.val}
                      initial={{ scale: 1.18, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {u.val}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="count-labels">
                <span>Days</span><span>Hours</span><span>Minutes</span><span>Seconds</span>
              </div>
              <div className="count-copy">Our families are so excited that you are joining Rishav &amp; Amisha in celebrating what we hope will be one of the happiest days of their lives. See you on April 20th, 2026 at Hotel Anntilia Inn.</div>
              <div className="footer-note">© Missing Piece 2025</div>
            </Reveal>
          </div>
        </section>

      </div>
    </div>
  );
}