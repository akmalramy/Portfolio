import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file
const envPath = path.join(__dirname, '../.env')
let apiKey = process.env.GROQ_API_KEY
let modelName = process.env.GROQ_TRANSLATION_MODEL

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      const trimmedKey = key.trim()
      const trimmedValue = value.trim()
      if (trimmedKey === 'GROQ_API_KEY') {
        apiKey = trimmedValue
      } else if (trimmedKey === 'GROQ_TRANSLATION_MODEL') {
        modelName = trimmedValue
      }
    }
  })
}

console.log(`✓ Using API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'not found'}`)
console.log(`✓ Using Model: ${modelName}`)

// Direct HTTP call to Groq API
async function callGroqAPI(prompt) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 0.7
    })

    const options = {
      hostname: 'api.groq.com',
      port: 443,
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
      }
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            resolve(parsed.choices[0].message.content)
          } else {
            reject(new Error(`Invalid response: ${data}`))
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`))
        }
      })
    })

    req.on('error', (e) => {
      reject(e)
    })

    req.write(requestData)
    req.end()
  })
}

// Extract all text from JSX files
function extractTextFromFiles() {
  const srcDir = path.join(__dirname, '../src')
  const allText = []

  function walkDir(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walkDir(filePath)
      } else if (file.endsWith('.jsx') || file.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf-8')
        // Extract strings from JSX
        const stringMatches = content.match(/['"`]([^'"`]+)['"`]/g)
        const textMatches = content.match(/>([^<]+)</g)
        
        if (stringMatches) {
          allText.push(...stringMatches.map(s => s.slice(1, -1)))
        }
        if (textMatches) {
          allText.push(...textMatches.map(s => s.slice(1, -1).trim()).filter(s => s.length > 0))
        }
      }
    })
  }

  walkDir(srcDir)
  
  // Also extract from index.html
  const htmlPath = path.join(__dirname, '../index.html')
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
  const htmlMatches = htmlContent.match(/[>\s"]([^<>"]+)[<\s"]/g)
  if (htmlMatches) {
    allText.push(...htmlMatches.map(s => s.slice(1, -1).trim()).filter(s => s.length > 0))
  }

  return allText
}

// Extract unique words
function extractUniqueWords(texts) {
  const words = new Set()
  
  texts.forEach(text => {
    // Split by spaces and special characters, but preserve meaningful words
    const parts = text.split(/[\s\-_,.:;()[\]{}'"!?\/]+/)
    parts.forEach(part => {
      if (part.length > 0 && part.length < 50 && !/^[\d#+&$%*<>=@]+$/.test(part)) {
        words.add(part)
      }
    })
  })

  return Array.from(words).sort()
}

// Translate words using Groq
async function translateWords(words) {
  const translations = {}
  const batchSize = 30
  let successCount = 0

  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize)
    const wordList = batch.join(', ')

    try {
      const batchNum = Math.floor(i / batchSize) + 1
      const totalBatches = Math.ceil(words.length / batchSize)
      console.log(`\n[${batchNum}/${totalBatches}] Translating ${batch.length} words...`)
      console.log(`Words: ${batch.slice(0, 10).join(', ')}...`)

      const prompt = `Translate these English words to Arabic. Return ONLY a JSON object with no extra text. Format: {"word": "ترجمة"}

Words: ${wordList}

JSON Response:`

      const response = await callGroqAPI(prompt)
      console.log(`Response preview: ${response.substring(0, 80)}...`)

      // Parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const batchTranslations = JSON.parse(jsonMatch[0])
        Object.assign(translations, batchTranslations)
        successCount += Object.keys(batchTranslations).length
        console.log(`✓ Got ${Object.keys(batchTranslations).length} translations (Total: ${successCount})`)
      } else {
        console.log(`⚠ No JSON found in response`)
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`✗ Batch ${Math.floor(i / batchSize) + 1} error: ${error.message}`)
      // Continue with next batch even if one fails
    }
  }

  return translations
}

// Main function
async function main() {
  try {
    console.log('📖 Step 1: Extracting text from codebase...')
    const allTexts = extractTextFromFiles()
    console.log(`✓ Found ${allTexts.length} text segments\n`)

    console.log('🔍 Step 2: Extracting unique words...')
    const uniqueWords = extractUniqueWords(allTexts)
    console.log(`✓ Found ${uniqueWords.length} unique words`)
    console.log(`Sample words: ${uniqueWords.slice(0, 15).join(', ')}\n`)

    console.log('🌐 Step 3: Translating to Arabic via Groq API...')
    const translations = await translateWords(uniqueWords)

    console.log(`\n✅ Translation Complete: ${Object.keys(translations).length}/${uniqueWords.length} words translated\n`)

    // Save translations to file
    const outputPath = path.join(__dirname, '../src', 'translations.json')
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8')
    console.log(`📁 Translations saved to: ${outputPath}`)

    // Save bilingual dictionary
    const dictionaryPath = path.join(__dirname, '../src', 'dictionary.json')
    const dictionary = uniqueWords.map(word => ({
      english: word,
      arabic: translations[word] || `[${word}]`
    }))
    fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2), 'utf-8')
    console.log(`📁 Dictionary saved to: ${dictionaryPath}`)

    // Display sample translations
    console.log('\n📝 Sample Translations (first 25):')
    const translatedWords = Object.keys(translations).slice(0, 25)
    translatedWords.forEach(word => {
      console.log(`  ${word.padEnd(30)} → ${translations[word]}`)
    })

    console.log('\n✅ All tasks completed successfully!')
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

main()
