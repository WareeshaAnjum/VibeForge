import React from 'react'

export default function PresetCard({ emoji, title, desc, onPlay }) {
  return (
    <div className="preset-card" role="article" aria-label={title}>
      <div className="preset-emoji" aria-hidden>
        {emoji}
      </div>
      <div className="preset-body">
        <div className="preset-title">{title}</div>
        <div className="preset-desc">{desc}</div>
      </div>
      <button
        className="play-btn"
        onClick={() => onPlay({ title, emoji })}
        aria-label={`Play ${title}`}
      >
        Play
      </button>
    </div>
  )
}
