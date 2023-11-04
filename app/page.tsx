
import Card from '@/components/Card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'


export default async function Index() {

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
