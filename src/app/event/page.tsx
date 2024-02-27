import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Card from '@/src/components/Card'
import RoundedRightButton from '@/src/components/buttons/RoundedRightButton'
import addIcon from '@/src/components/logos/addIcon'
import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { redirect } from 'next/navigation'
import { getUserRole } from '@/src/utils/getUserRole'

interface Event {
  id: number;
  name: string;
  location: string;
  event_date: Date;
}
// TODO: ranger les types au bon endroit

export default async function page() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore});
  const { data: events } = await supabase.from('events').select()
  const { data: {session }} = await supabase.auth.getSession()
  if (!session) { redirect('/login')}

  const role = session.user ? await getUserRole(session.user.id) : null;
  const isAdmin = role === 'admin';
  const sortEventsByDate = (events : Event[]) => {
    return events.sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  // Trier les événements après leur récupération
  const sortedEvents = events ? sortEventsByDate(events) : [];
  return (
    <>
        {events ? (events.map((event) => (
          <Card key={event.id}>
              <Link href={`/event/${event.id}`} className='flex flex-row items-center'>
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p>{event.event_date}</p> 
                  <p>{event.location}</p>
                </div>
                <ChevronRightIcon className='w-6 h-6 ml-auto'/>
              </Link>
          </Card>
        ))) : (<p>No events found</p>)}
        {isAdmin ?  <RoundedRightButton path='/event/add' icon={addIcon()}/> : null}
    </>
  )
}

// TODO : ajouter la gestion de la date de l'évènement