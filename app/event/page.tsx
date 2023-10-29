import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Card from '@/components/Card'
import RoundedButton from '@/components/buttons/RoundedButton'
import addIcon from '@/components/logos/addIcon'
import Link from 'next/link'

export default async function page() {
  const supabase = createServerComponentClient({ cookies })
  const { data: events } = await supabase.from('events').select()
  return (
    <>
     <h2 className="text-2xl font-bold mb-4">Events</h2>
        {events ? (events.map((event) => (
          <Card key={event.id}>
              <Link href={`/event/${event.id}`} className='flex flex-col'>
                <p className="font-bold">{event.name}</p>
                <p>{event.date}</p>
                <p>{event.location}</p>
              </Link>
          </Card>
        ))) : (<p>No events found</p>)}
        
        <RoundedButton path='/event/add' icon={addIcon()}/>
    </>
  )
}
