function PresetCard({ emoji, title, description, slug, onPlay }) {
  return (
    <article className="preset-card">
      <div className="preset-topline">
        <span className="preset-emoji" aria-hidden="true">{emoji}</span>
        <span className="preset-tag">PRESET</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="play-button" type="button" onClick={() => onPlay({ emoji, title, slug })}>
        <span aria-hidden="true">▶</span> Play
      </button>
    </article>
  )
}

export default PresetCard
