import { useState } from 'react'
import './App.css'
import PresetCard from './components/PresetCard'
import GamePreview from './pages/GamePreview'

const presets = [
  { slug: 'snake-in-space', emoji: '🐍', title: 'Snake in Space', description: 'Guide a neon serpent through asteroid fields and collect stardust.' },
  { slug: 'flappy-bird-underwater', emoji: '🌊', title: 'Flappy Bird Underwater', description: 'Glide past coral reefs and dodge the deep sea’s sharpest surprises.' },
  { slug: 'horror-chess', emoji: '♟️', title: 'Horror Chess', description: 'Outwit a haunted chessboard where every move wakes something darker.' },
  { slug: 'pacman-with-zombies', emoji: '🧟', title: 'Pacman with Zombies', description: 'Eat every pellet while an undead horde closes in from every corridor.' },
  { slug: 'temple-run-volcano', emoji: '🌋', title: 'Temple Run Volcano', description: 'Sprint through crumbling ruins with a river of lava at your heels.' },
  { slug: 'angry-birds-with-tanks', emoji: '💣', title: 'Angry Birds with Tanks', description: 'Launch a feathery artillery squad against a heavily armored invasion.' },
]

function App() {
  const [prompt, setPrompt] = useState('')
  const [notice, setNotice] = useState('')
  const [activeGame, setActiveGame] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState('')

  const selectPreset = (preset) => setActiveGame(preset)

  const handleGenerate = async () => {
    const gamePrompt = prompt.trim()
    if (!gamePrompt || isGenerating) return

    setIsGenerating(true)
    setNotice('')
    setProgress('Designing...')
    const progressTimer = window.setInterval(() => {
      setProgress((current) => (
        current === 'Designing...' ? 'Writing code...' : 'Launching game...'
      ))
    }, 850)

    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: gamePrompt }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to generate a game.')

      setProgress('Launching game...')
      window.setTimeout(() => {
        setActiveGame({ emoji: '✦', title: 'Your VibeForge Game', html: result.html })
      }, 350)
    } catch (error) {
      setNotice(error.message)
    } finally {
      window.clearInterval(progressTimer)
      setIsGenerating(false)
    }
  }

  if (activeGame) {
    return <GamePreview game={activeGame} onBack={() => setActiveGame(null)} />
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="hero" aria-labelledby="page-title">
        <div className="brand-mark" aria-hidden="true"><span>✦</span></div>
        <p className="eyebrow">INSTANT GAME IDEAS</p>
        <h1 id="page-title">VibeForge <span aria-label="video game">🎮</span></h1>
        <p className="hero-copy">Describe any game in one sentence. Play it instantly.</p>

        <div className="forge-panel">
          <label className="sr-only" htmlFor="game-prompt">Describe your game</label>
          <textarea
            id="game-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Example: Flappy Bird but underwater"
            rows="4"
          />
          <div className="panel-footer">
            <span className="prompt-hint">Press generate to start forging</span>
            <button className="generate-button" type="button" onClick={handleGenerate} disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? <span className="loading-spinner" aria-hidden="true" /> : <span aria-hidden="true">✦</span>}
              {isGenerating ? progress : 'Generate Game'}
            </button>
          </div>
        </div>
        {isGenerating && <p className="generation-status" role="status">{progress}</p>}
        {notice && <p className="notice" role="status">{notice}</p>}
      </section>

      <section className="presets" aria-labelledby="presets-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">QUICK START</p>
            <h2 id="presets-title">🔥 Popular Presets</h2>
          </div>
          <span className="preset-count">6 GAME MODES</span>
        </div>
        <div className="preset-grid">
          {presets.map((preset) => (
            <PresetCard key={preset.title} {...preset} onPlay={selectPreset} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
