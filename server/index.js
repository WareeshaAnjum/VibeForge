import { createServer } from 'node:http'

const port = 3001
const model = process.env.OPENAI_MODEL || 'gpt-5'

const gameInstructions = `You are an expert browser game developer. Create a small, complete, playable browser game based on the user's idea.

Return ONLY one complete HTML document, beginning with <!doctype html> and ending with </html>. Do not use Markdown fences or commentary.

The game must use only inline HTML, CSS, and JavaScript. Do not use external libraries, CDNs, imports, network requests, or remote assets. It must run entirely inside a sandboxed iframe, be responsive, and support keyboard and/or mouse controls where appropriate. Include concise on-screen instructions and a restart option.`

const respond = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

function getCompleteHtml(output) {
  const html = output
    .trim()
    .replace(/^```(?:html)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()

  if (!/^<!doctype html>/i.test(html) || !/<html[\s>]/i.test(html) || !/<\/html>$/i.test(html)) {
    throw new Error('The game generator returned an incomplete HTML document.')
  }

  return html
}

async function generateGame(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error('OPENAI_API_KEY is not configured.')
    error.statusCode = 500
    throw error
  }

  const apiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions: gameInstructions,
      input: prompt,
      max_output_tokens: 6000,
    }),
  })

  if (!apiResponse.ok) {
    const error = new Error('OpenAI could not generate a game right now.')
    error.statusCode = 502
    throw error
  }

  const result = await apiResponse.json()
  return getCompleteHtml(result.output_text || '')
}

createServer((request, response) => {
  if (request.method !== 'POST' || request.url !== '/generate') {
    return respond(response, 404, { error: 'Not found.' })
  }

  let body = ''
  request.on('data', (chunk) => { body += chunk })
  request.on('end', async () => {
    try {
      const prompt = JSON.parse(body).prompt?.trim()
      if (!prompt) return respond(response, 400, { error: 'A prompt is required.' })

      const html = await generateGame(prompt)
      return respond(response, 200, { html })
    } catch (error) {
      const status = error.statusCode || 500
      return respond(response, status, { error: error.message || 'Unable to generate a game.' })
    }
  })
}).listen(port, () => console.log(`VibeForge generator running at http://localhost:${port}`))
