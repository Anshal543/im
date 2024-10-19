// "use client";

// import { useState } from "react";

// const CarUploadForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     model: "",
//     year: "",
//     description: "",
//     fault: "",
//     used: false,
//     purchasePrice: "",
//     sellPrice: "",
//     status: "available",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevData) => ({ ...prevData, used: e.target.checked }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setImageFile(e.target.files?.[0] || null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setUploading(true);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) =>
//       formDataToSend.append(key, (formData as any)[key])
//     );
//     if (imageFile) formDataToSend.append("image", imageFile);

//     try {
//       const response = await fetch("/api/cars", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const result = await response.json();
//       console.log(result);
//       if (result.type === "success") {
//         alert("Car uploaded successfully!");
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
//         Sell Your Car
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Car Name */}
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Car Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter car name"
//             required
//           />
//         </div>

//         {/* Model */}
//         <div>
//           <label
//             htmlFor="model"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Model
//           </label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter car model"
//             required
//           />
//         </div>

//         {/* Year */}
//         <div>
//           <label
//             htmlFor="year"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Year
//           </label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter car year"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter car description"
//             rows={4}
//             required
//           />
//         </div>

//         {/* Fault */}
//         <div>
//           <label
//             htmlFor="fault"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Fault
//           </label>
//           <textarea
//             name="fault"
//             value={formData.fault}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter any faults (if applicable)"
//             rows={2}
//           />
//         </div>

//         {/* Used */}
//         <div className="flex items-center">
//           <label
//             htmlFor="used"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Used
//           </label>
//           <input
//             type="checkbox"
//             name="used"
//             checked={formData.used}
//             onChange={handleCheckboxChange}
//             className="ml-2 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Purchase Price */}
//         <div>
//           <label
//             htmlFor="purchasePrice"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Purchase Price
//           </label>
//           <input
//             type="number"
//             name="purchasePrice"
//             value={formData.purchasePrice}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter purchase price"
//             required
//           />
//         </div>

//         {/* Sell Price */}
//         <div>
//           <label
//             htmlFor="sellPrice"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Sell Price
//           </label>
//           <input
//             type="number"
//             name="sellPrice"
//             value={formData.sellPrice}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             placeholder="Enter sell price"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label
//             htmlFor="status"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Status
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleInputChange}
//             className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//             required
//           >
//             <option value="available">Available</option>
//             <option value="sold">Sold</option>
//           </select>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label
//             htmlFor="image"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Upload Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className={`w-full p-3 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//             uploading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CarUploadForm;

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const CarUploadForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    description: "",
    fault: "",
    used: false,
    purchasePrice: "",
    sellPrice: "",
    status: "available",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Zod schema for form validation
  const carSchema = z.object({
    name: z.string().min(1, { message: "Car name is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    year: z
      .string()
      .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" })
      .transform(Number)
      .refine((year) => year >= 1886 && year <= new Date().getFullYear(), {
        message: "Year must be between 1886 and the current year",
      }),
    description: z.string().min(1, { message: "Description is required" }),
    fault: z.string().optional(),
    used: z.boolean(),
    purchasePrice: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid purchase price" })
      .transform(Number),
    sellPrice: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid sell price" })
      .optional()
      .transform(Number)
      .nullable(),
    status: z.enum(["available", "sold"]),
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    setErrors({});

    // Validate form data with Zod
    const validationResult = carSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setUploading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, (formData as any)[key])
    );
    if (imageFile) formDataToSend.append("image", imageFile);

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.type === "success") {
        toast.success("Car uploaded successfully!");
        setTimeout(() => {
          
          router.push("/dashboard/manage");
        }, 1000);
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Sell Your Car
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Car Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car name"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Model */}
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car model"
            // required
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car year"
            required
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter car description"
            rows={4}
            // required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Fault */}
        <div>
          <label
            htmlFor="fault"
            className="block text-sm font-medium text-gray-700"
          >
            Fault
          </label>
          <textarea
            name="fault"
            value={formData.fault}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter any faults (if applicable)"
            rows={2}
          />
          {errors.fault && (
            <p className="text-red-500 text-sm mt-1">{errors.fault}</p>
          )}
        </div>

        {/* Used */}
        <div className="flex items-center">
          <label
            htmlFor="used"
            className="block text-sm font-medium text-gray-700"
          >
            Used
          </label>
          <input
            type="checkbox"
            name="used"
            checked={formData.used}
            onChange={handleCheckboxChange}
            className="ml-2 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          {errors.used && (
            <p className="text-red-500 text-sm mt-1">{errors.used}</p>
          )}
        </div>

        {/* Purchase Price */}
        <div>
          <label
            htmlFor="purchasePrice"
            className="block text-sm font-medium text-gray-700"
          >
            Purchase Price
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter purchase price"
            required
          />
          {errors.purchasePrice && (
            <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
          )}
        </div>

        {/* Sell Price */}
        <div>
          <label
            htmlFor="sellPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Sell Price
          </label>
          <input
            type="number"
            name="sellPrice"
            value={formData.sellPrice}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter sell price"
          />
           {errors.sellPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.sellPrice}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
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
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
           {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CarUploadForm;
