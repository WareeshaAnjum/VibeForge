function GameFrame({ html, title }) {
  return (
    <iframe
      className="game-frame"
      srcDoc={html}
      title={title}
      sandbox="allow-scripts"
    />
  )
}

export default GameFrame
