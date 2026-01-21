'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import AuthModal from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { Sparkles, Moon, Brain, TrendingUp } from 'lucide-react'

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [dreamText, setDreamText] = useState('')
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleDreamSubmit = () => {
    if (!user) {
      // Show auth modal if not logged in
      setShowAuthModal(true)
    } else {
      // TODO: Navigate to dream recording page or save dream
      router.push('/dashboard')
    }
  }

  return (
    <div className="dreamy-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full space-y-12 animate-fade-in">
          {/* Logo and Title */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Moon className="w-12 h-12 animate-float" style={{ color: 'var(--soft-lavender)' }} />
              <h1 className="text-5xl md:text-6xl font-bold" style={{ color: 'var(--celestial-white)' }}>
                Dreamssaver
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(240, 244, 248, 0.9)' }}>
              Capture your dreams, discover patterns, and unlock insights into your subconscious with AI-powered analysis
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="card-dreamy text-center space-y-4">
              <Brain className="w-10 h-10 mx-auto" style={{ color: 'var(--soft-lavender)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--celestial-white)' }}>AI Insights</h3>
              <p className="text-sm" style={{ color: 'rgba(240, 244, 248, 0.7)' }}>
                Discover recurring symbols, emotional patterns, and meaningful connections in your dreams
              </p>
            </div>
            <div className="card-dreamy text-center space-y-4">
              <TrendingUp className="w-10 h-10 mx-auto" style={{ color: 'var(--muted-teal)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--celestial-white)' }}>Track Trends</h3>
              <p className="text-sm" style={{ color: 'rgba(240, 244, 248, 0.7)' }}>
                Visualize your dream patterns over time with beautiful charts and analytics
              </p>
            </div>
            <div className="card-dreamy text-center space-y-4">
              <Sparkles className="w-10 h-10 mx-auto" style={{ color: 'var(--gentle-rose)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--celestial-white)' }}>Dreamy Design</h3>
              <p className="text-sm" style={{ color: 'rgba(240, 244, 248, 0.7)' }}>
                A beautiful, calming interface designed for reflection and introspection
              </p>
            </div>
          </div>

          {/* Dream Input Section */}
          <div className="card-dreamy mt-16 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--celestial-white)' }}>
                Start Your Dream Journey
              </h2>
              <p style={{ color: 'rgba(240, 244, 248, 0.7)' }}>
                Record your dream below. Sign up or log in to save and analyze it with AI.
              </p>
            </div>
            
            <textarea
              className="input-dreamy min-h-[200px] resize-none"
              placeholder="Describe your dream here... What did you see? How did you feel? What stood out to you?"
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDreamSubmit}
                disabled={!dreamText.trim()}
                className="flex-1"
              >
                Save & Analyze Dream
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowAuthModal(true)}
                className="flex-1"
              >
                Sign Up / Log In
              </Button>
            </div>

            <p className="text-sm text-center" style={{ color: 'rgba(240, 244, 248, 0.6)' }}>
              Free tier includes 5 AI insights. Upgrade to Premium for unlimited analysis.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-4 mt-12">
            <p className="text-lg" style={{ color: 'rgba(240, 244, 248, 0.8)' }}>
              Join thousands exploring their inner world through dreams
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="tag tag-lavender">Unlimited Dream Storage</span>
              <span className="tag tag-teal">AI-Powered Analysis</span>
              <span className="tag tag-rose">5 Free Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  )
}
