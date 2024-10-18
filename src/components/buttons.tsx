import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/manage/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/manage/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // const deleteInvoiceById = deleteInvoice.bind(null, id);
  const deleteInvoiceById = async()=>{
    try {
      const res = await fetch("/api/invoices", {
        method: "DELETE",
        body: JSON.stringify({ invoiceId: id }),
      });
      const result = await res.json();
      if (result.success) {
        console.log("Invoice deleted and path revalidated!");
        toast.success("Invoice deleted successfully");
        window.location.reload();
        // Optionally refetch your data here if needed
      } else {
        console.error("Failed to delete invoice");
        toast.error("Failed to delete invoice");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  }
  return (
    <>
      <div onClick={deleteInvoiceById}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </div>
    </>
  );
}
