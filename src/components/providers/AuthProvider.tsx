'use client'

import { AuthProvider as SupabaseAuthProvider } from '@/contexts/AuthContext'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
}
