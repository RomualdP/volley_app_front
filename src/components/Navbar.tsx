import Link from 'next/link';
import { HomeIcon, CalendarIcon, PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { getUserProfile } from '@/src/utils/getUserProfil';
import photoSerge from '@/public/images/photoSerge.png';

type NavbarProps = {
  user: User | undefined;
};

export default async function Navbar({ user }: NavbarProps) {
  const profil = user ? await getUserProfile(user.id) : null;
  console.log(profil);
  return (
    <nav className="fixed bottom-0 w-full flex justify-center border-t-8 border-white h-24 bg-primary">
      <div className="w-full max-w-4xl flex justify-around items-center text-sm text-foreground">
        <Link href="/" className="no-underline items-center flex flex-col">
          <HomeIcon className="w-8 h-8" />
          <span className="text-xs my-1">Accueil</span>
        </Link>
        <Link href="/event" className="no-underline items-center flex flex-col">
          <CalendarIcon className="w-8 h-8" />
          <span className="text-xs my-1">Matchs</span>
        </Link>
        {user ? (
          <Link
            href="/profil"
            className="no-underline items-center flex flex-col"
          >
            <Image
              width={32}
              height={32}
              src={profil?.avatar_url || photoSerge}
              alt={`photo de profil de ${profil?.name}`}
              className="rounded-full"
            />
            <span className="text-xs my-1">Mon profil</span>
          </Link>
        ) : (
          <Link
            href="/profil"
            className="no-underline items-center flex flex-col"
          >
            <PersonIcon className="w-8 h-8" />
            <span className="text-xs my-1">Profil</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
