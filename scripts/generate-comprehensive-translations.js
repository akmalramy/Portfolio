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

console.log(`✓ API Key loaded`)
console.log(`✓ Model: ${modelName}`)

// Key phrases to translate - extracted from components
const textSegments = [
  // Hero Section
  'Available for opportunities',
  'Hi, I\'m Akmal Ramy',
  'Junior Data Engineer',
  'Cairo, Egypt',
  'I specialize in building scalable cloud data architectures, ETL pipelines, and analytics dashboards using Azure, Python, SQL, and Power BI.',
  'View Projects',
  'Contact Me',
  'Download CV',

  // About Section
  'About Me',
  'I\'m a Business Information Systems student passionate about designing scalable cloud data systems, building automated ETL pipelines, and creating analytics dashboards that support data-driven decision making.',
  'Cloud Architecture',
  'Designing scalable cloud data systems on Azure',
  'ETL Pipelines',
  'Building automated data pipelines and workflows',
  'Analytics Dashboards',
  'Creating insights with Power BI and Tableau',

  // Skills Section
  'Skills & Technologies',
  'Programming',
  'Cloud & ETL',
  'Analytics & BI',
  'Databases',
  'Python',
  'SQL',
  'HTML',
  'CSS',
  'Azure Data Factory',
  'Azure Synapse Analytics',
  'Databricks (PySpark)',
  'Power BI',
  'Tableau',
  'Excel',
  'MySQL',
  'SQL Server',
  'Data Warehousing',

  // Experience Section
  'Work Experience',
  'Data Engineering Microsoft Track',
  'DEPI',
  'Remote',
  'NOV 2025 - Present',
  'Built secure cloud data architectures',
  'Developed ETL/ELT pipelines using Azure Data Factory, Databricks, PySpark, SQL',
  'Designed scalable Azure Synapse data warehouses',
  'Implemented data transformation and processing workflows',
  'HR Talent Acquisition',
  'National Bank of Egypt',
  'Cairo, Egypt',
  'JUL 2025 - AUG 2025',
  'Built analytics dashboards supporting recruitment insights',
  'Conducted workforce analytics supporting accessibility initiatives',
  'Analyzed recruitment data to optimize hiring processes',
  'Created reports for HR management decision support',
  'Data Analyst Intern',
  'National Telecom Regulatory Authority',
  'JUL 2024 - AUG 2024',
  'Analyzed large datasets using Excel & SQL',
  'Built Power BI dashboards for KPIs',
  'Created IoT business model research',
  'Delivered data-driven insights for decision making',

  // Projects Section
  'Featured Projects',
  'Olist E-Commerce Data Analysis | End-to-End BI Project',
  'Delivered an end-to-end analysis of the 1.5M-row Olist E-Commerce dataset using Python, SQL Server, and Power BI. Built a clean relational database and star-schema model with advanced DAX measures, creating an interactive dashboard that identified logistics issues impacting customer satisfaction and retention.',
  'NBE Branch Analytics & Social Impact Strategy',
  'Conducted analytical research on National Bank of Egypt branch distribution and social impact initiatives, focusing on youth engagement and PWD inclusion. Developed data-driven recommendations to support market expansion, strengthen brand positioning, and align with inclusion policies while linking insights to ROI, EVP, and long-term growth opportunities.',
  'Titanic Survival Insights (Exploratory Data Analysis)',
  'Performed exploratory data analysis on the Titanic dataset to identify survival determinants through demographic segmentation, age binning, and ticket-price correlation analysis. Built statistical visualizations and an interactive dashboard to validate gender and passenger class as primary survival predictors.',
  'Financial Performance & Revenue Analysis Dashboard',
  'Developed an interactive financial analytics dashboard to monitor multi-currency revenue, expenses, and regional performance. Implemented time-series analysis and segmented reporting to identify revenue peaks, key growth drivers, and operational expense trends, enabling stakeholders to track performance exceeding $100M and support data-driven decisions.',
  'Power BI KPI Dashboard System',
  'Created comprehensive Power BI dashboards for tracking key performance indicators across multiple business units, featuring interactive visualizations, drill-down capabilities, and real-time data refresh.',
  'E-commerce Data Analysis Platform',
  'Developed end-to-end data analysis solution for e-commerce datasets using Python for data processing, SQL for database queries, and Power BI for visualization, delivering actionable business insights.',
  'University ERD Database System',
  'Designed and implemented a normalized University Management database in SQL Server based on an ERD model. Built core academic entities with proper relationships, constraints, indexing, and performance optimization. Developed analytical queries and a stored procedure (sp_RunReports) to generate comprehensive administrative reports.',

  // Education Section
  'Education',
  'Bachelor of Business Information Systems',
  'Galala University powered by Arizona State University',
  'Expected Graduation: July 2027',
  'Relevant Coursework',
  'Database Management Systems',
  'Data Analytics',
  'Business Intelligence',
  'Cloud Computing',
  'Information Systems',
  'Data Structures',

  // Contact Section
  'Get In Touch',
  'Contact Information',
  'I\'m always open to discussing new opportunities, collaborations, or just having a chat about data engineering.',
  'Email',
  'Phone',
  'LinkedIn',
  'Name',
  'Your Name',
  'Email',
  'yourname@example.com',
  'Message',
  'Your message...',
  'Send Message',
  'Thank you for your message! I will get back to you soon.',

  // Navigation
  'Home',
  'About',
  'Skills',
  'Experience',
  'Projects',
  'Education',
  'Contact',
]

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

// Translate phrases with context
async function translatePhrases(phrases) {
  const translations = {}
  const batchSize = 8

  for (let i = 0; i < phrases.length; i += batchSize) {
    const batch = phrases.slice(i, i + batchSize)

    try {
      const batchNum = Math.floor(i / batchSize) + 1
      const totalBatches = Math.ceil(phrases.length / batchSize)
      console.log(`\n[${batchNum}/${totalBatches}] Translating ${batch.length} phrases...`)
      batch.forEach((p, idx) => console.log(`  ${idx + 1}. "${p.substring(0, 60)}${p.length > 60 ? '...' : ''}"`))

      const phrasesList = batch.map((p, i) => `${i + 1}. "${p}"`).join('\n')

      const prompt = `You are a professional translator specializing in professional and technical content. Translate the following English phrases to Arabic, maintaining the professional tone, context, and meaning. NOT literal word-by-word translation, but natural, professional Arabic that conveys the same meaning and intent.

${phrasesList}

Return ONLY a JSON object with NO extra text or explanation. Use the phrase number as the key. Format:
{
  "1": "الترجمة الاحترافية 1",
  "2": "الترجمة الاحترافية 2"
}

JSON Response:`

      const response = await callGroqAPI(prompt)
      console.log(`Response preview: ${response.substring(0, 100)}...`)

      // Parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const batchTranslations = JSON.parse(jsonMatch[0])
        batch.forEach((phrase, idx) => {
          const key = (idx + 1).toString()
          if (batchTranslations[key]) {
            translations[phrase] = batchTranslations[key]
            console.log(`  ✓ "${phrase.substring(0, 50)}" → "${batchTranslations[key].substring(0, 50)}"`)
          }
        })
      } else {
        console.log(`⚠ No JSON found in response`)
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error) {
      console.error(`✗ Batch ${Math.floor(i / batchSize) + 1} error: ${error.message}`)
    }
  }

  return translations
}

// Main function
async function main() {
  try {
    console.log('📝 Step 1: Preparing text segments for translation...')
    console.log(`✓ Found ${textSegments.length} key phrases to translate\n`)

    console.log('🌐 Step 2: Translating phrases to Arabic via Groq API...')
    const translations = await translatePhrases(textSegments)

    console.log(`\n✅ Translation Complete: ${Object.keys(translations).length}/${textSegments.length} phrases translated\n`)

    // Save comprehensive translations to file
    const outputPath = path.join(__dirname, '../src', 'phraseTranslations.json')
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8')
    console.log(`📁 Phrase translations saved to: ${outputPath}`)

    // Also create a translation map for easy access
    const translationMap = {}
    Object.entries(translations).forEach(([english, arabic]) => {
      translationMap[english] = arabic
    })

    // Display sample translations
    console.log('\n📝 Sample Translations:')
    const samples = Object.entries(translations).slice(0, 15)
    samples.forEach(([english, arabic]) => {
      console.log(`\n  EN: "${english}"`)
      console.log(`  AR: "${arabic}"`)
    })

    console.log('\n✅ All tasks completed successfully!')
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

main()
