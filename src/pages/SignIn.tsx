import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Field } from '../components/bits'
import { useStore } from '../lib/store'

export function SignIn() {
  const { signIn } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') ?? '/'
  // Pre-filled deliberately. Nothing is checked and nothing is transmitted, but
  // an empty password box invites a visitor to type a real one out of habit.
  const [email, setEmail] = useState('sarah.okafor@brightwell-architects.co.uk')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return setError('Enter the email address on your trade account.')
    if (password.length < 4) return setError('Your password is at least four characters.')
    setError('')
    signIn(email)
    navigate(next)
  }

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 text-[0.9375rem]">Trade accounts see net pricing and order history.</p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field
          label="Email" type="email" value={email} autoComplete="email"
          onChange={(e) => setEmail(e.target.value)} placeholder="you@practice.co.uk"
        />
        <Field
          label="Password" type="password" value={password} autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
        />
        {error && <p role="alert" className="text-sm text-signal">{error}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>

      <div className="mt-6 border border-line bg-white p-4 text-sm">
        <p className="font-medium text-ink">This is a demonstration</p>
        <p className="mt-1 text-body">
          The fields are filled in already — just sign in. There is no server here:
          nothing is checked, nothing is transmitted, and what you type never leaves
          your browser. Your cart and orders are stored on this device only.
        </p>
        <p className="mt-2 text-body">Please don't enter a password you use elsewhere.</p>
      </div>
    </div>
  )
}
