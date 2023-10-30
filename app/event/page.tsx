import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Card from '@/components/Card'
import RoundedRightButton from '@/components/buttons/RoundedRightButton'
import addIcon from '@/components/logos/addIcon'
import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'

export default async function page() {
  const supabase = createServerComponentClient({ cookies })
  const { data: events } = await supabase.from('events').select()
  return (
    <>
        {events ? (events.map((event) => (
          <Card key={event.id}>
              <Link href={`/event/${event.id}`} className='flex flex-row items-center'>
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
                <ChevronRightIcon className='w-6 h-6 ml-auto'/>
              </Link>
          </Card>
        ))) : (<p>No events found</p>)}
          <RoundedRightButton path='/event/add' icon={addIcon()}/>
    </>
  )
}
