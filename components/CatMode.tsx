"use client";

import { useState, useEffect } from "react";

const CAT_PHOTOS = [
  "https://www.reseausecoursanimal.org/wp-content/uploads/2024/12/chat-brun-1024x682.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/elementor/thumbs/chat-adoption-malo-qrcpb0h03q9fzcz8v2k9rh5qmc2xhdyw9w1b6mgsrk.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/elementor/thumbs/chat-adoption-gratouille-scaled-qrcp8nvk8hu2kgjuzyv0n5cm6zviwduru1ws54fgco.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/2024/07/chat-adoption-pivoine-683x1024.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/2025/05/Byba-1024x768.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/2025/05/Anatole-1-768x1024.jpg",
  "https://www.reseausecoursanimal.org/wp-content/uploads/2024/07/chat-mystere.jpg",
];

const KAWAII_EMOJIS = ["🐱", "🐾", "💕", "✨", "🌸", "💖", "😻", "🎀", "⭐", "🌟", "💗", "🐈"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface FloatingCat {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  duration: number;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  size: number;
}

export function CatMode() {
  const [active, setActive] = useState(false);
  const [cats, setCats] = useState<FloatingCat[]>([]);
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  const toggle = () => {
    const next = !active;
    setActive(next);
    if (next) {
      document.documentElement.setAttribute("data-cat", "true");
    } else {
      document.documentElement.removeAttribute("data-cat");
    }
  };

  useEffect(() => {
    if (!active) return;

    const newCats: FloatingCat[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      src: CAT_PHOTOS[i % CAT_PHOTOS.length],
      x: randomBetween(2, 85),
      y: randomBetween(15, 80),
      rotation: randomBetween(-25, 25),
      scale: randomBetween(0.6, 1.2),
      delay: randomBetween(0, 3),
      duration: randomBetween(2, 5),
    }));
    setCats(newCats);

    const newEmojis: FloatingEmoji[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: KAWAII_EMOJIS[i % KAWAII_EMOJIS.length],
      x: randomBetween(0, 95),
      y: randomBetween(0, 95),
      delay: randomBetween(0, 5),
      size: randomBetween(16, 40),
    }));
    setEmojis(newEmojis);
  }, [active]);

  return (
    <>
      <button
        onClick={toggle}
        className={`fixed bottom-5 right-5 z-50 px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
          active
            ? "bg-pink-400 border-pink-500 text-white animate-bounce shadow-[0_0_20px_rgba(255,105,180,0.8)]"
            : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-pink-400 hover:text-pink-400"
        }`}
      >
        {active ? "😻 meow 😻" : "🐱"}
      </button>

      {active && (
        <div className="cat-mode-overlay">
          <div className="cat-banner">
            <span className="cat-banner-text">
              🐱 In Montreal? Adopt a cat or make a donation 💕
            </span>
            <a
              href="https://www.reseausecoursanimal.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cat-banner-link"
            >
              reseausecoursanimal.org →
            </a>
          </div>

          {emojis.map((e) => (
            <span
              key={`emoji-${e.id}`}
              className="cat-floating-emoji"
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                fontSize: `${e.size}px`,
                animationDelay: `${e.delay}s`,
              }}
            >
              {e.emoji}
            </span>
          ))}

          {cats.map((cat) => (
            <div
              key={`cat-${cat.id}`}
              className="cat-floating-photo"
              style={{
                left: `${cat.x}%`,
                top: `${cat.y}%`,
                transform: `rotate(${cat.rotation}deg) scale(${cat.scale})`,
                animationDelay: `${cat.delay}s`,
                animationDuration: `${cat.duration}s`,
              }}
            >
              <img
                src={cat.src}
                alt="Adoptable cat"
                loading="eager"
              />
            </div>
          ))}

          <div className="cat-bottom-cta">
            <p>These cats need homes. Every one of them is real and waiting.</p>
            <a
              href="https://www.reseausecoursanimal.org/adoption/adopter-chat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              See all adoptable cats 🐾
            </a>
          </div>
        </div>
      )}
    </>
  );
}
