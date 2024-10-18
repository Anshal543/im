import React from 'react'
import { supabase } from '@/supabase/client'
import Cards from '@/components/card'

export const revalidate = 0

const Home = async() => {
  const {data, error} = await supabase.from('cars').select('*')
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      <Cards data={data ?? []} />
    </div>
  )
}

export default Home