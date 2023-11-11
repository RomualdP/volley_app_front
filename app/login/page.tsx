'use client'
import Messages from './messages'
import Card from '@/components/Card'
import { useState, FormEvent } from 'react'
import validatePassword from '@/utils/validatePassword'

export default function Login() {
  const [passwordErrors, setPasswordErrors] = useState<String[]>([]);

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    const errors = validatePassword(password);
    if (errors.length > 0) {
      event.preventDefault(); // Arrête la soumission du formulaire
      setPasswordErrors(errors);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
          onSubmit={handleSubmit}
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
           {passwordErrors.length > 0 && (
            <ul className="text-red-500">
              {passwordErrors.map((error, index) => (
                <li className="text-xs"key={index}>{error}</li>
              ))}
            </ul>
          )}
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
