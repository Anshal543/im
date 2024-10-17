import { supabase } from "@/supabase/client";

const ITEMS_PER_PAGE = 6;

export async function fetchCarsPages(query: string) {
  try {
    const { count, error } = await supabase
      .from('cars')
      .select('*', { count: 'exact' }) // 'exact' returns the count of rows
  
      console.log({ count, error });
    if (error) {
      console.error('Supabase Error1:', error);
      throw new Error('Failed to fetch total number of cars.');
    }

    // Calculate total pages based on the count of results
    const totalPages = Math.ceil(count??0 / ITEMS_PER_PAGE);
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
          sellprice,
          images
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
  
