'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { FREE_INSIGHT_LIMIT } from '@/lib/constants'
import { Moon, Plus, ChevronRight, Sparkles, Calendar, Settings } from 'lucide-react'

type DreamRow = {
  id: string
  title: string | null
  recording_date: string
  mood_upon_waking: string
  dream_text: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [dreams, setDreams] = useState<DreamRow[]>([])
  const [dreamsLoading, setDreamsLoading] = useState(true)
  const [insightsRemaining, setInsightsRemaining] = useState<number | null>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/')
      return
    }
  }, [user, router])

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('dream_recordings')
      .select('id, title, recording_date, mood_upon_waking, dream_text')
      .eq('user_id', user.id)
      .order('recording_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setDreams(data as DreamRow[])
        setDreamsLoading(false)
      })
  }, [user])

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('user_insight_counters')
      .select('insights_remaining')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setInsightsRemaining(data?.insights_remaining ?? FREE_INSIGHT_LIMIT)
      })
  }, [user])

  const totalDreams = dreams.length
  const now = new Date()
  const thisMonthCount = dreams.filter((d) => {
    const d2 = new Date(d.recording_date)
    return d2.getFullYear() === now.getFullYear() && d2.getMonth() === now.getMonth()
  }).length
  const insightsUsed = Math.min(
    FREE_INSIGHT_LIMIT,
    Math.max(0, FREE_INSIGHT_LIMIT - (insightsRemaining ?? FREE_INSIGHT_LIMIT))
  )

  if (loading || !user) {
    return (
      <div className="dreamy-bg min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{ color: 'var(--celestial-white)' }}>Loading…</div>
      </div>
    )
  }

  return (
    <div className="dreamy-bg min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header: logo, insights, upgrade, new dream, sign out */}
        <header className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 no-underline">
            <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--celestial-white)' }}>
              Dreams Saver
            </h1>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span
              className="flex items-center gap-1.5 text-sm"
              style={{ color: 'rgba(240,244,248,0.9)' }}
              title="AI insights used this period"
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--soft-lavender)' }} />
              {insightsUsed}/{FREE_INSIGHT_LIMIT} Insights
            </span>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
              style={{
                background: 'rgba(240,244,248,0.08)',
                borderColor: 'rgba(199,146,234,0.25)',
                color: 'var(--celestial-white)',
              }}
              disabled
              title="Pro membership — Phase 2"
            >
              Upgrade
            </button>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--soft-lavender), #D2A7F0)',
                color: 'var(--deep-twilight)',
              }}
            >
              <Plus className="w-4 h-4" />
              New Dream
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Settings"
              title="Settings (coming soon)"
            >
              <Settings className="w-5 h-5" style={{ color: 'var(--celestial-white)' }} />
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-sm font-medium hover:underline"
              style={{ color: 'rgba(240,244,248,0.9)' }}
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Three stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="card-dreamy flex items-center gap-4">
            <Moon className="w-10 h-10 shrink-0" style={{ color: 'var(--soft-lavender)' }} />
            <div>
              <p className="text-sm" style={{ color: 'rgba(240,244,248,0.7)' }}>
                Total Dreams
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--celestial-white)' }}>
                {dreamsLoading ? '…' : totalDreams}
              </p>
            </div>
          </div>
          <div className="card-dreamy flex items-center gap-4">
            <Sparkles className="w-10 h-10 shrink-0" style={{ color: 'var(--soft-lavender)' }} />
            <div>
              <p className="text-sm" style={{ color: 'rgba(240,244,248,0.7)' }}>
                AI Insights
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--celestial-white)' }}>
                {insightsUsed}
              </p>
            </div>
          </div>
          <div className="card-dreamy flex items-center gap-4">
            <Calendar className="w-10 h-10 shrink-0" style={{ color: 'var(--soft-lavender)' }} />
            <div>
              <p className="text-sm" style={{ color: 'rgba(240,244,248,0.7)' }}>
                This Month
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--celestial-white)' }}>
                {dreamsLoading ? '…' : thisMonthCount}
              </p>
            </div>
          </div>
        </section>

        {/* Dream list or empty state */}
        <section>
          {dreamsLoading ? (
            <p style={{ color: 'rgba(240,244,248,0.7)' }}>Loading dreams…</p>
          ) : dreams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Moon
                className="w-24 h-24 mb-6 opacity-60"
                style={{ color: 'var(--soft-lavender)' }}
                aria-hidden
              />
              <p className="mb-6 text-center" style={{ color: 'rgba(240,244,248,0.8)' }}>
                You haven&apos;t recorded any dreams yet.
              </p>
              <Link
                href="/dashboard/new"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium no-underline"
                style={{ background: 'var(--soft-lavender)', color: 'var(--deep-twilight)' }}
              >
                <Plus className="w-4 h-4" />
                Record your first dream
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {dreams.map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/dashboard/dreams/${d.id}`}
                    className="card-dreamy block no-underline group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate" style={{ color: 'var(--celestial-white)' }}>
                          {d.title || 'Untitled dream'}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: 'rgba(240,244,248,0.6)' }}>
                          {new Date(d.recording_date).toLocaleDateString(undefined, {
                            dateStyle: 'medium',
                          })}{' '}
                          · {d.mood_upon_waking}
                        </p>
                        <p className="text-sm mt-2 line-clamp-2" style={{ color: 'rgba(240,244,248,0.8)' }}>
                          {d.dream_text}
                        </p>
                      </div>
                      <ChevronRight
                        className="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100"
                        style={{ color: 'var(--celestial-white)' }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
