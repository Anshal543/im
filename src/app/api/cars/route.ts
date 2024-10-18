import { NextResponse } from 'next/server';
// import { supabase } from '@/supabase/client';
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function POST(request: Request) {

  const formData = await request.formData();
  console.log(formData)

  const name = formData.get('name') as string;
  const model = formData.get('model') as string;
  const year = formData.get('year') as string;
  const description = formData.get('description') as string;
  const fault = formData.get('fault') as string;
  const purchasePrice = formData.get('purchasePrice') as string;
  const sellPrice = formData.get('sellPrice') as string;
  const used = formData.get('used') === 'true';
  const status = formData.get('status') as string;
  const imageFile = formData.get('image') as File;

  try {
    // Upload image to Supabase Storage
    let imageUrl = null
    
    const fileName = `${Date.now()}-${imageFile.name}`;
    const supabase = createServerActionClient({cookies})
    const { data: imageData, error: imageError } = await supabase.storage
      .from('cars')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
      }
      );
      console.log(imageError,"image error")
    if (imageError) {
      return NextResponse.json({ type: 'error', message: 'Failed to upload image' });
    }
    if(imageData){
      const publicUrl = supabase.storage.from('cars').getPublicUrl(fileName).data.publicUrl
      console.log(publicUrl,"public url")
    }
  
    // Insert car data into Supabase
    const { error: carError } = await supabase
      .from('cars')
      .insert({
        name,
        model,
        year,
        description,
        fault,
        purchaseprice: purchasePrice,
        sellprice: sellPrice,
        used,
        status,
        imageUrl
      });

    if (carError) {
      return NextResponse.json({ type: 'error', message: 'Failed to create car' });
    }

    return NextResponse.json({ type: 'success', message: 'Car uploaded successfully' });
  } catch (error) {
    return NextResponse.json({ type: 'error', message: 'Failed to create car' });
  }
}
