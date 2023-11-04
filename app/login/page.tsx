import Link from 'next/link'
import Messages from './messages'
import Card from '@/components/Card'

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-secondary rounded px-4 py-2 text-white mb-2">
            Se connecter
          </button>
          <button
            formAction="/auth/sign-up"
            className="border border-gray-400 rounded px-4 py-2 text-black mb-2"
          >
            S'inscrire
          </button>
          <Messages />
        </form>
      </Card>
    </div>
  )
}
