import { supabase } from "@/supabase/client";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(invoiceId: string) {
  try {
    console.log(invoiceId,"invoiceId")
    const { data, error } = await supabase
      .from("cars")
      .delete()
      .eq("id", invoiceId);

    if (error) {
      throw new Error("Failed to delete invoice");
    }
    revalidatePath("/dashboard/manage");
    return data;
  } catch (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to delete invoice" };
  } 
}