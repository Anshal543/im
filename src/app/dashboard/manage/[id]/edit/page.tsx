'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface FormData {
  name: string;
  model: string;
  year: string;
  description: string;
  fault: string;
  used: boolean;
  purchasePrice: string;
  sellPrice: string;
  status: string;
  image: File | string | null;
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    model: '',
    year: '',
    description: '',
    fault: '',
    used: false,
    purchasePrice: '',
    sellPrice: '',
    status: 'available',
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch car data on component mount
  useEffect(() => {
    const fetchCarData = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setError(error.message);
      } else {
        setFormData(data);
      }
    };

    fetchCarData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : undefined;
    const files = target instanceof HTMLInputElement ? target.files : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'image' ? files?.[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Prepare data for update
    const updatedData:Partial<FormData> = {
      name: formData.name,
      model: formData.model,
      year: formData.year,
      description: formData.description,
      fault: formData.fault,
      used: formData.used,
      purchasePrice: formData.purchasePrice,
      sellPrice: formData.sellPrice,
      status: formData.status,
    };

    // Handle image upload if necessary
    if (formData?.image instanceof File) {
      const fileName = `${Date.now()}-${formData.image.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('cars')
        .upload(fileName, formData.image);
  
      if (uploadError) {
        setUploading(false);
        setError(uploadError.message);
        return;
      }
  
      // Update the image path in the database
      updatedData.image = data.path;
    }
    // Update car data
    const { error } = await supabase.from('cars').update(updatedData).eq('id', id);

    setUploading(false);
    router.push('/dashboard/manage');

    if (error) {
      setError(error.message);
    } else {
      toast.success('Car updated successfully');
    }
  };

  if (error) {
    return <div>Error loading car: {error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sell Your Car</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Car Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car name"
            required
          />
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car model"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car year"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car description"
            rows={4}
            required
          />
        </div>

        {/* Fault */}
        <div>
          <label htmlFor="fault" className="block text-sm font-medium text-gray-700">Fault</label>
          <textarea
            name="fault"
            value={formData.fault}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter any faults (if applicable)"
            rows={2}
          />
        </div>

        {/* Used */}
        <div className="flex items-center">
          <label htmlFor="used" className="block text-sm font-medium text-gray-700">Used</label>
          <input
            type="checkbox"
            name="used"
            checked={formData.used}
            onChange={handleInputChange}
            className="ml-2 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
        </div>

        {/* Purchase Price */}
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter purchase price"
            required
          />
        </div>

        {/* Sell Price */}
        <div>
          <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">Sell Price</label>
          <input
            type="number"
            name="sellPrice"
            value={formData.sellPrice}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter sell price"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Page;
