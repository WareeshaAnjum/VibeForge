import React from 'react'
import PresetCard from './PresetCard'

const PRESETS = [
  {
    emoji: '🟢',
    title: 'Snake in Space',
    desc: 'Classic snake gameplay with zero-gravity and neon asteroids.',
  },
  {
    emoji: '🐟',
    title: 'Flappy Bird Underwater',
    desc: "Flappy mechanics with bubbles, seaweed, and coral obstacles.",
  },
  {
    emoji: '♟️',
    title: 'Horror Chess',
    desc: 'A tense chessboard with survival-horror ambience and creeping fog.',
  },
  {
    emoji: '😈',
    title: 'Pacman with Zombies',
    desc: 'Maze chase with zombies that evolve over time.',
  },
  {
    emoji: '🏃‍♂️',
    title: 'Temple Run Volcano',
    desc: 'Endless runner with lava flows and collapsing ruins.',
  },
  {
    emoji: '🐦',
    title: 'Angry Birds with Tanks',
    desc: 'Physics flingers meet armored tanks and destructible forts.',
  },
]

export default function Presets({ onPlay }) {
  return (
    <div className="presets-grid">
      {PRESETS.map((p) => (
        <PresetCard
          key={p.title}
          emoji={p.emoji}
          title={p.title}
          desc={p.desc}
          onPlay={() => onPlay(p)}
        />
      ))}
    </div>
  )
}
