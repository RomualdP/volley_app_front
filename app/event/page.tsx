import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function page() {
  const supabase = createServerComponentClient({ cookies })
  const { data: events } = await supabase.from('events').select()
  console.log(events)
  return (
  <div className="w-full max-w-4xl flex flex-col items-center p-3 text-sm text-foreground">
              <h2 className="text-2xl font-bold mb-4">Events</h2>
              {events ? (events.map((event) => (
                <div key={event.id} className="flex flex-row gap-2 shadow-md p-4 rounded-md m-2">
                  <div className='flex flex-col'>
                    <p className="font-bold">{event.name}</p>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <form className=''>
                      <label htmlFor="signUpEvent">S'inscrire à l'évent</label>
                      <input type="checkbox" id="signUpEvent" name="signUpEvent" value="signUpEvent" />
                      <button type="submit">S'inscrire</button>
                    </form>
                  </div>
                </div>
              ))) : (<p>No events found</p>)}
      </div>
  )
}
