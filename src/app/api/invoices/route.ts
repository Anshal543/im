"use server"
import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  try {
    const { invoiceId } = await request.json();

    const { data, error } = await supabase
      .from("cars")
      .delete()
      .eq("id", invoiceId);

    if (error) {
      throw new Error("Failed to delete invoice");
    }

    // Call revalidatePath on the server side after successful deletion
    revalidatePath("/dashboard/manage");

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
