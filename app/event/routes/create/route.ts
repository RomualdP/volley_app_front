import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const name = formData.get('name')
  const date = formData.get('date')
  const location = formData.get('location')
  const supabase = createServerActionClient({ cookies })
  console.log("supa", supabase)

  const { data, error, status } = await supabase.from('events').insert({
    name,
    date,
    location,
  })
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/event/add?error=failed`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/event/add?message=succeed`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
