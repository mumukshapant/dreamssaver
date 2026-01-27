'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/common/Button'
import { MOOD_OPTIONS_RECORDING } from '@/lib/constants'
import { ArrowLeft } from 'lucide-react'

export default function NewDreamPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    dream_text: '',
    recording_date: new Date().toISOString().slice(0, 10),
    title: '',
    mood_upon_waking: 'Neutral',
    lucid_status: false,
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setError(null)
    setSaving(true)
    const supabase = createClient()
    const tags = form.tags
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean)
    const { error: err } = await supabase.from('dream_recordings').insert({
      user_id: user.id,
      dream_text: form.dream_text,
      recording_date: form.recording_date,
      title: form.title.trim() || null,
      mood_upon_waking: form.mood_upon_waking,
      lucid_status: form.lucid_status,
      dream_clarity: 'Moderately Clear',
      key_symbols: tags,
      key_people: [],
    })
    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }
    router.push('/dashboard')
  }

  useEffect(() => {
    if (!loading && !user) router.replace('/')
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="dreamy-bg min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{ color: 'var(--celestial-white)' }}>Loading…</div>
      </div>
    )
  }

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

        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--celestial-white)' }}>
          Record new dream
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5' }}
            >
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.9)' }}>
              Dream title <span className="opacity-60">(optional)</span>
            </label>
            <input
              type="text"
              className="input-dreamy"
              placeholder="Short title for this dream"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.9)' }}>
              Dream content <span className="text-red-400">*</span>
            </label>
            <textarea
              className="input-dreamy min-h-[200px] resize-y"
              placeholder="Describe your dream in detail…"
              value={form.dream_text}
              onChange={(e) => setForm((f) => ({ ...f, dream_text: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.9)' }}>
              Date
            </label>
            <input
              type="date"
              className="input-dreamy"
              value={form.recording_date}
              onChange={(e) => setForm((f) => ({ ...f, recording_date: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.9)' }}>
              Mood upon waking
            </label>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS_RECORDING.map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-colors"
                  style={{
                    borderColor: form.mood_upon_waking === m ? 'var(--soft-lavender)' : 'rgba(240,244,248,0.2)',
                    background: form.mood_upon_waking === m ? 'rgba(199,146,234,0.15)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="mood"
                    value={m}
                    checked={form.mood_upon_waking === m}
                    onChange={() => setForm((f) => ({ ...f, mood_upon_waking: m }))}
                    className="sr-only"
                  />
                  <span style={{ color: 'var(--celestial-white)' }}>{m}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.lucid_status}
              onChange={(e) => setForm((f) => ({ ...f, lucid_status: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <span style={{ color: 'var(--celestial-white)' }}>Was this a lucid dream?</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.9)' }}>
              Tags / keywords
            </label>
            <input
              type="text"
              className="input-dreamy"
              placeholder="e.g. flying, school, water, anxiety"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <Button type="submit" disabled={saving || !form.dream_text.trim()} isLoading={saving} className="flex-1">
              Save dream
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="secondary" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
