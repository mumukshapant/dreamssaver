'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Moon, Plus, ChevronRight } from 'lucide-react'

type DreamRow = {
  id: string
  title: string | null
  recording_date: string
  mood_upon_waking: string
  dream_text: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [dreams, setDreams] = useState<DreamRow[]>([])
  const [dreamsLoading, setDreamsLoading] = useState(true)

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split('@')[0] ??
    'there'

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

  if (loading || !user) {
    return (
      <div className="dreamy-bg min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{ color: 'var(--celestial-white)' }}>Loading…</div>
      </div>
    )
  }

  return (
    <div className="dreamy-bg min-h-screen">
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <Moon className="w-10 h-10" style={{ color: 'var(--soft-lavender)' }} />
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--celestial-white)' }}>
              Welcome back, {displayName}
            </h1>
          </div>
        </header>

        <Link
          href="/dashboard/new"
          className="card-dreamy flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex mb-8 no-underline hover:border-[rgba(199,146,234,0.4)]"
        >
          <Plus className="w-5 h-5" style={{ color: 'var(--soft-lavender)' }} />
          <span style={{ color: 'var(--celestial-white)' }}>Record New Dream</span>
        </Link>

        <section>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--celestial-white)' }}>
            Your dreams
          </h2>
          {dreamsLoading ? (
            <p style={{ color: 'rgba(240,244,248,0.7)' }}>Loading…</p>
          ) : dreams.length === 0 ? (
            <div className="card-dreamy text-center py-12">
              <p className="mb-4" style={{ color: 'rgba(240,244,248,0.8)' }}>
                You haven&apos;t recorded any dreams yet.
              </p>
              <Link
                href="/dashboard/new"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium"
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
