import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface DreamInsightResult {
  insightText: string
  emotionalToneTags: {
    primary: string
    secondary: string[]
    intensity: number
  }
  symbols: string[]
  themes: string[]
  trendSummary: string
}

export async function generateDreamInsight(
  dreamText: string,
  moodUponWaking: string,
  dreamClarity: string,
  lucidStatus: boolean,
  preSleepActivities?: string,
  keySymbols?: string[],
  keyPeople?: string[]
): Promise<DreamInsightResult> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `You are an expert dream analyst. Analyze the following dream and provide insightful interpretation.

Dream Content:
"${dreamText}"

Context:
- Mood upon waking: ${moodUponWaking}
- Dream clarity: ${dreamClarity}
- Was this a lucid dream: ${lucidStatus ? 'Yes' : 'No'}
${preSleepActivities ? `- Pre-sleep activities: ${preSleepActivities}` : ''}
${keySymbols?.length ? `- Key symbols mentioned: ${keySymbols.join(', ')}` : ''}
${keyPeople?.length ? `- Key people mentioned: ${keyPeople.join(', ')}` : ''}

Please provide your analysis in the following JSON format only (no other text):
{
  "insightText": "A comprehensive 2-3 paragraph analysis of the dream's meaning, symbolism, and potential connections to the dreamer's waking life",
  "emotionalToneTags": {
    "primary": "The primary emotion (e.g., Fear, Joy, Anxiety, Nostalgia, Confusion, Peace, Excitement)",
    "secondary": ["List of 2-3 secondary emotions"],
    "intensity": 1-10 rating of emotional intensity
  },
  "symbols": ["List of 3-5 key symbols identified in the dream"],
  "themes": ["List of 2-3 overarching themes (e.g., Transformation, Loss, Discovery, Conflict Resolution)"],
  "trendSummary": "A brief one-sentence summary of the dream's core message"
}`


  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as DreamInsightResult
    return parsed
  } catch (error) {
    console.error('Error generating dream insight:', error)
    // Return a default response if AI fails
    return {
      insightText: 'Unable to generate insight at this time. Please try again later.',
      emotionalToneTags: {
        primary: moodUponWaking,
        secondary: [],
        intensity: 5
      },
      symbols: keySymbols || [],
      themes: ['Unknown'],
      trendSummary: 'Analysis pending'
    }
  }
}
