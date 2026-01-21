import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

export interface Dream {
  id: string
  userId: string
  recordingDate: Date
  dreamText: string
  timeOfSleepApprox?: string | null
  moodUponWaking: string
  dreamClarity: string
  lucidStatus: boolean
  preSleepActivities?: string | null
  keySymbols: string[]
  keyPeople: string[]
  dreamCategory?: string | null
  createdAt: Date
  updatedAt: Date
  insight?: DreamInsight | null
}

export interface DreamInsight {
  id: string
  recordingId: string
  insightText: string
  emotionalToneTags?: {
    primary: string
    secondary: string[]
    intensity: number
  } | null
  symbols: string[]
  themes: string[]
  trendSummary?: string | null
  generatedAt: Date
}

export interface DashboardStats {
  totalDreams: number
  lucidDreams: number
  nightmares: number
  insightsRemaining: number
  moodTrend: { date: string; mood: string; count: number }[]
  topSymbols: { symbol: string; count: number }[]
  emotionalIntensity: { date: string; intensity: number }[]
}
