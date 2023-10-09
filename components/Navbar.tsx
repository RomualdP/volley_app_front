import Link from 'next/link'
import LogoutButton from './LogoutButton'

type NavbarProps = {
    user: any
}
export default function Navbar({ user } : NavbarProps) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          {/* <Link
            href="/"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Accueil
          </Link>
          <Link
            href="/event"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Évènements
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span>Hey, {user.email}!</span>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )} */}
      </div>
    </nav>
  )
}
