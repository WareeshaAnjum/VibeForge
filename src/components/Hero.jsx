import React, { useState } from 'react'

export default function Hero({ onGenerate }) {
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    onGenerate(prompt)
  }

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="prompt-panel">
        <label htmlFor="game-prompt" style={{ display: 'none' }}>Game description</label>
        <textarea
          id="game-prompt"
          className="prompt-input"
          placeholder="Example: Flappy Bird but underwater"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
        />
        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={!prompt.trim()}
          aria-disabled={!prompt.trim()}
        >
          Generate Game
        </button>
      </div>
    </section>
  )
}
