'use client'

import { useState } from 'react'
import Button from '@/components/common/Button'
import { useAuth } from '@/contexts/AuthContext'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signUp, signIn } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          onClose()
          setEmail('')
          setPassword('')
        }
      } else {
        const { error } = await signUp(email, password, name)
        if (error) {
          setError(error.message)
        } else {
          setError(null)
          // Show success message - Supabase sends confirmation email
          alert('Please check your email to confirm your account!')
          setIsLogin(true)
          setEmail('')
          setPassword('')
          setName('')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-dreamy max-w-md w-full space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--celestial-white)' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'rgba(240, 244, 248, 0.7)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--celestial-white)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240, 244, 248, 0.7)'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg" style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
            <p className="text-sm" style={{ color: '#fca5a5' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240, 244, 248, 0.8)' }}>
                Name (Optional)
              </label>
              <input
                type="text"
                className="input-dreamy"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240, 244, 248, 0.8)' }}>
              Email
            </label>
            <input
              type="email"
              className="input-dreamy"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240, 244, 248, 0.8)' }}>
              Password
            </label>
            <input
              type="password"
              className="input-dreamy"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full" isLoading={loading} disabled={loading}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }}
              className="text-sm transition-colors w-full text-center"
              style={{ color: 'var(--soft-lavender)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D2A7F0'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-lavender)'}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
