'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft } from 'lucide-react'

type Dream = {
  id: string
  title: string | null
  recording_date: string
  mood_upon_waking: string
  lucid_status: boolean
  dream_text: string
  key_symbols: string[] | null
}

export default function DreamViewPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [dream, setDream] = useState<Dream | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
      return
    }
  }, [loading, user, router])

  useEffect(() => {
    if (!user || !id) return
    const supabase = createClient()
    supabase
      .from('dream_recordings')
      .select('id, title, recording_date, mood_upon_waking, lucid_status, dream_text, key_symbols')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setDream(null)
        } else {
          setDream(data as Dream)
        }
        setPageLoading(false)
      })
  }, [user, id])

  if (loading || !user) {
    return (
      <div className="dreamy-bg min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{ color: 'var(--celestial-white)' }}>Loading…</div>
      </div>
    )
  }

  if (pageLoading) {
    return (
      <div className="dreamy-bg min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{ color: 'var(--celestial-white)' }}>Loading dream…</div>
      </div>
    )
  }

  if (!dream) {
    return (
      <div className="dreamy-bg min-h-screen">
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
          <p style={{ color: 'var(--celestial-white)' }}>Dream not found.</p>
          <Link href="/dashboard" className="inline-block mt-4" style={{ color: 'var(--soft-lavender)' }}>
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const tags = dream.key_symbols ?? []

  return (
    <div className="dreamy-bg min-h-screen">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-8 text-sm"
          style={{ color: 'rgba(240,244,248,0.8)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--celestial-white)' }}>
          {dream.title || 'Untitled dream'}
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgba(240,244,248,0.7)' }}>
          {new Date(dream.recording_date).toLocaleDateString(undefined, { dateStyle: 'long' })} ·{' '}
          {dream.mood_upon_waking}
          {dream.lucid_status && ' · Lucid dream'}
        </p>

        <div className="card-dreamy mb-6">
          <h2 className="text-sm font-medium mb-2 uppercase tracking-wide" style={{ color: 'rgba(240,244,248,0.7)' }}>
            Dream content
          </h2>
          <p className="whitespace-pre-wrap" style={{ color: 'var(--celestial-white)', lineHeight: 1.6 }}>
            {dream.dream_text}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2 uppercase tracking-wide" style={{ color: 'rgba(240,244,248,0.7)' }}>
              Tags / keywords
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="tag tag-lavender">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-dreamy border-dashed">
          <h2 className="text-sm font-medium mb-2 uppercase tracking-wide" style={{ color: 'rgba(240,244,248,0.7)' }}>
            AI insight
          </h2>
          <p className="text-sm" style={{ color: 'rgba(240,244,248,0.6)' }}>
            AI analysis will appear here once the Gemini integration is connected. Free tier: 5 insights; premium:
            unlimited.
          </p>
        </div>
      </div>
    </div>
  )
}
