// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { string } from "zod";

// interface CarFormProps {}

// const CarForm: React.FC<CarFormProps> = () => {
//   const [formState, setFormState] = useState({
//     name: "",
//     model: "",
//     year: "",
//     description: "",
//     fault: "",
//     purchaseprice: "",
//     sellprice: "",
//     status: "available",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [state, setState] = useState({
//     message: string | undefined,
//     errors: {} as Record<string, string[]>,
//     type: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     Object.entries(formState).forEach(([key, value]) => formData.append(key, value));
//     if (image) {
//       formData.append("imageUrl", image);
//       console.log(formData)
//     }

//     try {
//       console.log("enter trycatch")
//       const response = await fetch("/api/sell-your-car", {
//         method: "POST",
//         body: formData,
//       });
//       console.log("request")
//       const result = await response.json();

//       setState({
//         type: result.type,
//         message: result.message,
//         errors: result.errors || {},
//       });

//       setIsSubmitting(false);
//     } catch (error) {
//       setState({
//         type: "error",
//         message: "An error occurred during submission.",
//         errors: {},
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
//       {/* Car Name */}
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium">
//           Car Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={formState.name}
//           onChange={handleChange}
//           placeholder="Enter car name"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.name && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.name.join(", ")}</p>
//         )}
//       </div>

//       {/* Model */}
//       <div>
//         <label htmlFor="model" className="block text-sm font-medium">
//           Model
//         </label>
//         <input
//           type="text"
//           name="model"
//           id="model"
//           value={formState.model}
//           onChange={handleChange}
//           placeholder="Enter car model"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.model && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.model.join(", ")}</p>
//         )}
//       </div>

//       {/* Year */}
//       <div>
//         <label htmlFor="year" className="block text-sm font-medium">
//           Year
//         </label>
//         <input
//           type="text"
//           name="year"
//           id="year"
//           value={formState.year}
//           onChange={handleChange}
//           placeholder="Enter car year"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.year && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.year.join(", ")}</p>
//         )}
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium">
//           Description
//         </label>
//         <textarea
//           name="description"
//           id="description"
//           value={formState.description}
//           onChange={handleChange}
//           placeholder="Enter car description"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.description && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.description.join(", ")}</p>
//         )}
//       </div>

//       {/* Fault */}
//       <div>
//         <label htmlFor="fault" className="block text-sm font-medium">
//           Fault (if any)
//         </label>
//         <input
//           type="text"
//           name="fault"
//           id="fault"
//           value={formState.fault}
//           onChange={handleChange}
//           placeholder="Enter fault"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.fault && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.fault.join(", ")}</p>
//         )}
//       </div>

//       {/* Purchase Price */}
//       <div>
//         <label htmlFor="purchaseprice" className="block text-sm font-medium">
//           Purchase Price
//         </label>
//         <input
//           type="number"
//           name="purchaseprice"
//           id="purchaseprice"
//           value={formState.purchaseprice}
//           onChange={handleChange}
//           placeholder="Enter purchase price"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.purchaseprice && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.purchaseprice.join(", ")}</p>
//         )}
//       </div>

//       {/* Sell Price */}
//       <div>
//         <label htmlFor="sellprice" className="block text-sm font-medium">
//           Sell Price
//         </label>
//         <input
//           type="number"
//           name="sellprice"
//           id="sellprice"
//           value={formState.sellprice}
//           onChange={handleChange}
//           placeholder="Enter sell price"
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
//         />
//         {state.errors?.sellprice && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.sellprice.join(", ")}</p>
//         )}
//       </div>

//       {/* Status (Available or Sold) */}
//       <fieldset>
//         <legend className="block text-sm font-medium">Status</legend>
//         <div className="mt-2 space-x-4">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="status"
//               value="available"
//               checked={formState.status === "available"}
//               onChange={handleChange}
//               className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
//             />
//             <span className="ml-2">Available</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="status"
//               value="sold"
//               checked={formState.status === "sold"}
//               onChange={handleChange}
//               className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
//             />
//             <span className="ml-2">Sold</span>
//           </label>
//         </div>
//         {state.errors?.status && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.status.join(", ")}</p>
//         )}
//       </fieldset>

//       {/* Image Upload */}
//       <div>
//         <label htmlFor="image" className="block text-sm font-medium">
//           Upload Car Image
//         </label>
//         <input
//           type="file"
//           id="image"
//           name="imageUrl"
//           accept=".jpg,.jpeg,.png,.webp"
//           onChange={handleImageChange}
//           className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
//         />
//         {state.errors?.imageUrl && (
//           <p className="mt-2 text-sm text-red-500">{state.errors.imageUrl.join(", ")}</p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <Button disabled={isSubmitting} type="submit">
//           {isSubmitting ? "Creating..." : "Create Car"}
//         </Button>
//       </div>

//       {/* Feedback Message */}
//       {state.message && (
//         <p className={`mt-4 text-sm ${state.type === "success" ? "text-green-500" : "text-red-500"}`}>
//           {state.message}
//         </p>
//       )}
//     </form>
//   );
// };

// export default CarForm;
'use client';

import { useState } from 'react';

const CarUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
    description: '',
    fault: '',
    used: false,
    purchasePrice: '',
    sellPrice: '',
    status: 'available',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, used: e.target.checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, (formData as any)[key]));
    if (imageFile) formDataToSend.append('image', imageFile);

    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        body: formDataToSend,
      });


      const result = await response.json();
      console.log(result)
      if (result.type === 'success') {
        alert('Car uploaded successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input type="text" name="model" value={formData.model} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
        <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div className="mb-4">
        <label htmlFor="fault" className="block text-sm font-medium text-gray-700">Fault</label>
        <textarea name="fault" value={formData.fault} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="used" className="block text-sm font-medium text-gray-700">Used</label>
        <input type="checkbox" name="used" checked={formData.used} onChange={handleCheckboxChange} className="mt-1" />
      </div>

      <div className="mb-4">
        <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
        <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required />
      </div>

      <div className="mb-4">
        <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">Sell Price</label>
        <input type="number" name="sellPrice" value={formData.sellPrice} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" value={formData.status} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" required>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="image"  className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input type="file" name='image'  onChange={handleImageChange} className="mt-1 block w-full" />
      </div>

      <button type="submit" className={`px-4 py-2 text-white bg-blue-600 rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
};

export default CarUploadForm;
