'use client'

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function ClientComponent() {
  const [events, setEvents] = useState<any[]>([])

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getEvents = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabase.from('Events').select()
      if (data) {
        setEvents(data)
      }
    }

    getEvents()
  }, [supabase, setEvents])

  return <pre>{JSON.stringify(events, null, 2)}</pre>
}
