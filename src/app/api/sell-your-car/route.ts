"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import {
  FormData,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "@/lib/create-inventory";
import { cookies } from "next/headers"; // This can still be used in API route
import formidable from "formidable";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    const {
      name,
      model,
      year,
      description,
      fault,
      used,
      purchaseprice,
      sellprice,
      status,
    } = fields;

    const imageUrl = files.imageUrl;

    // Validate data with Zod
    const validatedFields = FormData.safeParse({
      name,
      model,
      year,
      description,
      fault,
      used,
      purchaseprice: purchaseprice ,
      sellprice: sellprice ,
      status,
      imageUrl,
    });

    if (!validatedFields.success) {
      return res.status(400).json({
        type: "error",
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed.",
      });
    }

    try {
      const supabase = createServerActionClient({ cookies });
      const fileName = `${Math.random()}-${imageUrl?.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from("car-images")
        .upload(fileName, imageUrl, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        return res
          .status(500)
          .json({ type: "error", message: "Image upload failed" });
      }

      const { data, error: carError } = await supabase.from("cars").insert({
        name,
        model,
        year,
        description,
        fault,
        used,
        purchaseprice,
        sellprice,
        status,
        imageUrl: imageData.path,
      });

      if (carError) {
        return res
          .status(500)
          .json({ type: "error", message: "Failed to create car." });
      }

      res
        .status(200)
        .json({ type: "success", message: "Car created successfully." });
    } catch (error) {
      res
        .status(500)
        .json({
          type: "error",
          message: "An error occurred while creating the car.",
        });
    }
  });
}