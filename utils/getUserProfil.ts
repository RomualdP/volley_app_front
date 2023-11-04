import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export function getUserProfil(id: String) {
    const supabase = createServerComponentClient({ cookies })
    return supabase.from('profil').select('*').eq('user_id', id)
}