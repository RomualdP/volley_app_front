import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { HomeIcon, CalendarIcon, PersonIcon } from '@radix-ui/react-icons'

type NavbarProps = {
    user: any
}
export default function Navbar({ user } : NavbarProps) {
  return (
    <nav className="fixed bottom-0 w-full flex justify-center border-t-8 border-white h-24 bg-primary">
      <div className="w-full max-w-4xl flex justify-around items-center text-sm text-foreground">
          <Link
            href="/"
            className="no-underline items-center flex flex-col"
          >
            <HomeIcon className="w-8 h-8" />
            <span className='text-xs my-1'>Accueil</span>
          </Link>
          <Link
            href="/event"
            className="no-underline items-center flex flex-col"
          >
            <CalendarIcon className="w-8 h-8" />
            <span className='text-xs my-1'>Matchs</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Hey, {user.email}!</span>
              <LogoutButton />
            </div>
          ) : (
            <Link
            href="/profil"
            className="no-underline items-center flex flex-col"
          >
            <PersonIcon className="w-8 h-8" />
            <span className='text-xs my-1'>Profil</span>
          </Link>
          )}
      </div>
    </nav>
  )
}
