
import Card from '@/components/Card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'


export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore});
  const { data: {session }} = await supabase.auth.getSession()
  if (!session) { redirect('/login')}
  return (
    <div className="w-full max-w-4xl flex flex-col items-center p-4 text-sm text-foreground my-24 gap-4">
        <Card>
            <h2 className='font-anime-ace text-l font-bold mb-4'>Dernières infos</h2>
            <p><b>30/10</b> Attention à votre consommation de bonbons avant les matchs</p>
        </Card>
        <Card>
            <h2 className='font-anime-ace text-l font-bold mb-4'>Prochain match</h2>
            <p>20/11 Lagny - Otis</p>
        </Card>
      </div>
  )
}
