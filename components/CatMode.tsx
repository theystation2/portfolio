"use client";

import { useState, useEffect } from "react";

const CAT_PHOTOS = [
  { name: "Philémon", src: "https://cdn.rescuegroups.org/52/pictures/animals/22475/22475129/103153791.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22475129" },
  { name: "Tamlin", src: "https://cdn.rescuegroups.org/52/pictures/animals/22493/22493009/103190687.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22493009" },
  { name: "Milo", src: "https://cdn.rescuegroups.org/52/pictures/animals/21340/21340361/103184899.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21340361" },
  { name: "Chagall", src: "https://cdn.rescuegroups.org/52/pictures/animals/22475/22475071/103153456.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22475071" },
  { name: "Cadbury", src: "https://cdn.rescuegroups.org/52/pictures/animals/21009/21009006/103167119.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21009006" },
  { name: "Edwina", src: "https://cdn.rescuegroups.org/52/pictures/animals/22457/22457749/103116465.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22457749" },
  { name: "Picatsso", src: "https://cdn.rescuegroups.org/52/pictures/animals/22286/22286672/102833909.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22286672" },
  { name: "Pitaya", src: "https://cdn.rescuegroups.org/52/pictures/animals/22425/22425768/103045991.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22425768" },
  { name: "Hina", src: "https://cdn.rescuegroups.org/52/pictures/animals/22423/22423396/103040038.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22423396" },
  { name: "Carter", src: "https://cdn.rescuegroups.org/52/pictures/animals/21895/21895079/103034000.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21895079" },
  { name: "Billie Holiday", src: "https://cdn.rescuegroups.org/52/pictures/animals/22407/22407444/103004430.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22407444" },
  { name: "Zucky", src: "https://cdn.rescuegroups.org/52/pictures/animals/20537/20537764/100695044.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=20537764" },
  { name: "Lustucru", src: "https://cdn.rescuegroups.org/52/pictures/animals/22334/22334300/102838562.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22334300" },
  { name: "Félix & Wiwi", src: "https://cdn.rescuegroups.org/52/pictures/animals/21831/21831786/101687402.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21831786" },
  { name: "Névé", src: "https://cdn.rescuegroups.org/52/pictures/animals/22189/22189407/102537934.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22189407" },
  { name: "Clermont", src: "https://cdn.rescuegroups.org/52/pictures/animals/22334/22334251/102838384.png", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22334251" },
  { name: "Calvin", src: "https://cdn.rescuegroups.org/52/pictures/animals/21340/21340638/100583683.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21340638" },
  { name: "Tommy", src: "https://cdn.rescuegroups.org/52/pictures/animals/20915/20915226/99567308.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=20915226" },
  { name: "Richie", src: "https://cdn.rescuegroups.org/52/pictures/animals/22126/22126833/102354745.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22126833" },
  { name: "Ozzy", src: "https://cdn.rescuegroups.org/52/pictures/animals/22189/22189708/102537530.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22189708" },
  { name: "Marlo", src: "https://cdn.rescuegroups.org/52/pictures/animals/22189/22189411/102537939.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22189411" },
  { name: "Gilbert", src: "https://cdn.rescuegroups.org/52/pictures/animals/22257/22257221/102657752.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22257221" },
  { name: "Warlock", src: "https://cdn.rescuegroups.org/52/pictures/animals/22126/22126836/102354741.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=22126836" },
  { name: "Gaston", src: "https://cdn.rescuegroups.org/52/pictures/animals/20537/20537757/99275897.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=20537757" },
  { name: "Anoki", src: "https://cdn.rescuegroups.org/52/pictures/animals/21895/21895134/101830079.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21895134" },
  { name: "Pruneau", src: "https://cdn.rescuegroups.org/52/pictures/animals/21570/21570852/101361634.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21570852" },
  { name: "Donatella", src: "https://cdn.rescuegroups.org/52/pictures/animals/20930/20930783/101130716.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=20930783" },
  { name: "Alphonse", src: "https://cdn.rescuegroups.org/52/pictures/animals/21093/21093152/100003909.jpg", url: "https://www.reseausecoursanimal.org/adoption/adopter-chat/#action_0=pet&animalID_0=21093152" },
];

const KAWAII_EMOJIS = ["🐱", "🐾", "💕", "✨", "🌸", "💖", "😻", "🎀", "⭐", "🌟", "💗", "🐈"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface FloatingCat {
  id: number;
  name: string;
  src: string;
  url: string;
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

    // Pick 16 random cats from the full list
    const shuffled = [...CAT_PHOTOS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 16);

    const newCats: FloatingCat[] = selected.map((photo, i) => ({
      id: i,
      name: photo.name,
      src: photo.src,
      url: photo.url,
      x: randomBetween(2, 82),
      y: randomBetween(14, 78),
      rotation: randomBetween(-20, 20),
      scale: randomBetween(0.7, 1.1),
      delay: randomBetween(0, 2),
      duration: randomBetween(2, 4),
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
        className={`fixed top-5 right-5 z-50 px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
          active
            ? "bg-pink-400 border-pink-500 text-white animate-bounce shadow-[0_0_20px_rgba(255,105,180,0.8)]"
            : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-pink-400 hover:text-pink-400"
        }`}
      >
        {active ? "😻 meow 😻" : "🐱"}
      </button>

      {active && (
        <div className="cat-mode-overlay">
          <button
            onClick={toggle}
            className="fixed top-5 left-5 z-[10002] px-4 py-2 text-sm font-semibold rounded-full bg-white text-pink-600 border-2 border-pink-400 shadow-lg hover:bg-pink-50 hover:scale-105 transition-all"
          >
            ← Back to portfolio
          </button>

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
            <a
              key={`cat-${cat.id}`}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
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
                alt={`${cat.name} — click to adopt`}
                loading="eager"
              />
              <span className="cat-name-label">{cat.name}</span>
            </a>
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
