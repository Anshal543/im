import { supabase } from '@/supabase/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define a Zod schema for the car upload form data
const carSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Year must be a valid 4-digit number" })
    .transform((val) => parseInt(val, 10)),
  description: z.string().min(1, { message: "Description is required" }),
  fault: z.string().min(1, { message: "Fault is required" }),
  purchasePrice: z
    .string()
    .min(1, { message: "Purchase price is required" })
    .transform((val) => parseFloat(val)),
  sellPrice: z
    .string()
    .min(1, { message: "Sell price is required" })
    .transform((val) => parseFloat(val)),
  used: z.string().transform((val) => val === 'true'),
  status: z.string().min(1, { message: "Status is required" }),
  image: z.any(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Convert formData to a plain object for Zod parsing
    const carData = {
      name: formData.get('name') as string,
      model: formData.get('model') as string,
      year: formData.get('year') as string,
      description: formData.get('description') as string,
      fault: formData.get('fault') as string,
      purchasePrice: formData.get('purchasePrice') as string,
      sellPrice: formData.get('sellPrice') as string,
      used: formData.get('used') as string,
      status: formData.get('status') as string,
      image: formData.get('image'),
    };

    // Validate and parse data using Zod
    const parsedData = carSchema.safeParse(carData);

    if (!parsedData.success) {
      const errors = parsedData.error.format();
      console.log(errors)
      return NextResponse.json({ type: 'error', message: 'Validation failed', errors });
    }

    const { name, model, year, description, fault, purchasePrice, sellPrice, used, status, image } = parsedData.data;

    // Upload image to Supabase Storage
    const fileName = `${Date.now()}-${(image as File).name}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from('cars')
      .upload(fileName, image as File, {
        cacheControl: '3600',
        upsert: false,
      });

    if (imageError) {
      return NextResponse.json({ type: 'error', message: 'Failed to upload image' });
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
        purchasePrice,
        sellPrice,
        used,
        status,
        image: imageData?.path,
      });

    if (carError) {
      return NextResponse.json({ type: 'error', message: 'Failed to create car' });
    }
    revalidatePath('/dashboard/manage');
    return NextResponse.json({ type: 'success', message: 'Car uploaded successfully' });
    
  } catch (error) {
    return NextResponse.json({ type: 'error', message: 'Failed to create car' });
  }

}
