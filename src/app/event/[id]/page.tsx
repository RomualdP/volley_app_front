
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'
import Card from '@/src/components/Card'

async function EventDetail({ params: { id } }: { params: { id: string }}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore});
    const { data: event } = await supabase.from('events').select().eq('id', id).single()
  return (
    <Card>
        <p>{event.name}</p>
        <p>{event.date}</p>
        <p>{event.location}</p>
    </Card>
  )
}

export default EventDetail