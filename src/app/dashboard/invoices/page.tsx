'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

// Schema for filtering sold cars
const filterSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

const InvoiceComponent = () => {
  const [soldCars, setSoldCars] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1, // Default to current month
    year: new Date().getFullYear(),    // Default to current year
  });
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // Fetch sold cars from Supabase filtered by month and year
  const fetchSoldCars = async (month: number, year: number) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('name, sellPrice, soldon')
        .eq('status', 'sold')
        .gte('soldon', `${year}-${month}-01`)
        .lte('soldon', `${year}-${month}-31`);

      if (error) {
        setError(error.message);
      } else {
        setSoldCars(data || []);
        const totalSum = (data || []).reduce((acc, car) => acc + (car.sellPrice || 0), 0);
        setTotal(totalSum);
      }
    } catch (error) {
      setError('Error fetching cars data');
    }
  };

  useEffect(() => {
    const { month, year } = filters;
    fetchSoldCars(month, year);
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: Number(value) });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sold Cars Invoice</h2>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
          <select
            name="month"
            value={filters.month}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>{new Date(0, month - 1).toLocaleString('en', { month: 'long' })}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            min={1900}
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Car Name</th>
            <th className="text-right p-4">Sell Price</th>
            <th className="text-right p-4">Sold On</th>
          </tr>
        </thead>
        <tbody>
          {soldCars.map((car) => (
            <tr key={car.name} className="border-t border-gray-200">
              <td className="p-4">{car.name}</td>
              <td className="text-right p-4">{car.sellPrice ? `$${car.sellPrice}` : '-'}</td>
              <td className="text-right p-4">{new Date(car.soldon).toLocaleDateString()}</td>
            </tr>
          ))}
          {soldCars.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">No cars sold in this period</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50">
            <td className="p-4 font-bold">Total</td>
            <td className="text-right p-4 font-bold">${total}</td>
            <td className="p-4"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceComponent;
