import React from 'react'
import { createClient } from '@/supabase/client'
import Cards from '@/components/card'

export const revalidate = 3600

const Home = async() => {
  const supabase = createClient()
  const {data, error} = await supabase.from('cars').select('*')
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      <Cards data={data ?? []} />
    </div>
  )
}

export default Home