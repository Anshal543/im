import { supabase } from "@/supabase/client";

const ITEMS_PER_PAGE = 3;

export async function fetchCarsPages(query: string) {
  try {
    const { count, error } = await supabase
      .from('cars')
      .select('*', { count: 'exact',head:true }) // 'exact' returns the count of rows
  
    if (error) {
      console.error('Supabase Error1:', error);
      throw new Error('Failed to fetch total number of cars.');
    }

    // Calculate total pages based on the count of results
    const totalPages = Math.ceil(Number(count??0) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Supabase Error1:', error);
    throw new Error('Failed to fetch total number of cars.');
  }
}


export async function fetchFilteredCars(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          id,
          name,
          model,
          year,
          description,
          fault,
          used,
          status,
          sellPrice,
          image
        `)
        .order('year', { ascending: false })  // Sort by year in descending order
        .range(offset, offset + ITEMS_PER_PAGE - 1);
  
      if (error) {
        throw new Error('Failed to fetch cars');
      }
  
      return data;
    } catch (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch cars.');
    }
  }
  
