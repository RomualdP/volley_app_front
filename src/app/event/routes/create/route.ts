import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const name = formData.get('name');
  const event_date = formData.get('date');
  const location = formData.get('location');
  const supabase = createServerActionClient({ cookies });
  console.log('supa', supabase);

  const { error } = await supabase.from('events').insert({
    name,
    event_date,
    location,
  });

  if (error) {
    console.log('error', error);
    return NextResponse.redirect(
      `${requestUrl.origin}/event/add?error=Erreur lors de la création de l'événement`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/event/add?message=Création réussie`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
