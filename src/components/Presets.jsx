import React from 'react'
import PresetCard from './PresetCard'

const PRESETS = [
  {
    emoji: '🐍',
    title: 'Snake in Space',
    desc: 'Neon snake slithering through asteroid fields.',
  },
  {
    emoji: '🌊',
    title: 'Flappy Bird Underwater',
    desc: 'Float through kelp forests and dodge coral spikes.',
  },
  {
    emoji: '♟️',
    title: 'Horror Chess',
    desc: 'Creepy chess with haunting visuals and tense moves.',
  },
  {
    emoji: '🧟',
    title: 'Pacman with Zombies',
    desc: 'Gobble pellets while outrunning evolving zombies.',
  },
  {
    emoji: '🌋',
    title: 'Temple Run Volcano',
    desc: 'Dash through temples while lava chases from behind.',
  },
  {
    emoji: '💣',
    title: 'Angry Birds with Tanks',
    desc: 'Launch birds and blow up armored tanks and structures.',
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
