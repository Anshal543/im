"use server"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";
import { cookies } from "next/headers";

export type State = {
  errors?:{
    name?: string[];
    model?: string[];
    year?: string[];
    description?: string[];
    fault?: string[];
    used?: string[];
    status?: string[];
    purchaseprice?: string[];
    sellprice?: string[];
    imageUrl?: string[];
  };
  message?: string|null;
  type?: string |null
}
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const FormData = z.object({
  name: z.string().min(4),
  model: z.string().min(2),
  year: z.string().min(4),
  description: z.string().min(5),
  fault: z.string().optional(),
  used: z.string().optional(),
  status: z.enum(["available", "sold"]),
  purchaseprice: z.string(),
  sellprice: z.string(),
  imageUrl: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      `Only .jpg, .jpeg, .png, and webp files are supported`
    ),
});

// export async function sellYourCarAction(data) {


//   // const validatedFields = FormData.safeParse({
//   //   name: formData.get("name"),
//   //   model: formData.get("model"),
//   //   year: formData.get("year"),
//   //   description: formData.get("description"),
//   //   fault: formData.get("fault"),
//   //   purchaseprice:(formData.get("purchaseprice") as string),
//   //   sellprice: (formData.get("sellprice") as string),
//   //   status: formData.get("status"),
//   //   imageUrl: formData.get("imageUrl"),
//   // });

//   // if (!validatedFields.success) {
//   //   return {
//   //     type: "error",
//   //     errors: validatedFields.error.flatten().fieldErrors,
//   //     message: "Missing fields, failed to create car.",
//   //   };
//   // }

//   const {
//     name,
//     model,
//     year,
//     description,
//     fault,
//     purchaseprice,
//     sellprice,
//     status,
//     imageUrl,
//     used
//   } = data;

//   try {
//     const fileName = `${Math.random()}-${imageUrl.name}`;
//     const supabase = createServerActionClient({ cookies });
//     const { data: imageData, error: imageError } = await supabase.storage
//       .from("cars")
//       .upload(fileName, imageUrl, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (imageError) {
//       return { type: "error", message: "Failed to upload image" };
//     }

//     const { error: carError, data: carData } = await supabase
//       .from("cars")
//       .insert({
//         name,
//         model,
//         year,
//         description,
//         fault,
//         purchaseprice,
//         sellprice,
//         used,
//         status,
//         imageUrl: imageData.path,
//       });

//     if (carError) {
//       return { type: "error", message: "Failed to create car." };
//     }

//     return {
//       type: "success",
//       message: "Car created successfully.",
//     };
//   } catch (e) {
//     return {
//       type: "error",
//       message: "Failed to create car.",
//     };
//   }
// }

export async function sellYourCarAction(data, imageFile) {
  const {
    name,
    model,
    year,
    description,
    fault,
    purchaseprice,
    sellprice,
    status,
    used
  } = data;

  try {
    const supabase = createServerActionClient({ cookies });

    // Check if imageFile exists
    let imageUrl = null;
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from("cars")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        return { type: "error", message: "Failed to upload image." };
      }
      imageUrl = imageData.path;
    }

    // Insert car details
    const { error: carError } = await supabase
      .from("cars")
      .insert({
        name,
        model,
        year,
        description,
        fault,
        purchaseprice,
        sellprice,
        used,
        status,
        imageUrl
      });

    if (carError) {
      return { type: "error", message: "Failed to create car." };
    }

    return {
      type: "success",
      message: "Car created successfully.",
    };
  } catch (e) {
    return {
      type: "error",
      message: "Failed to create car.",
    };
  }
}
