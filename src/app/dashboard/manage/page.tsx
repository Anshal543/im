import { CreateInvoice } from "@/components/buttons";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { InvoicesTableSkeleton } from "@/components/skeletons";
import Table from "@/components/table";
import { fetchCarsPages } from "@/lib/data";
import { Suspense } from "react";

export const revalidate = 0
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCarsPages(query);

  return (
    <div className="flex flex-col w-full min-h-[92%]">
      {/* Header */}
     

      {/* Search and Create */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 mb-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      {/* Table */}
      <div className="flex-grow">
        {" "}
        {/* Allows table to grow to fill space */}
        {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage} />
      {/* </Suspense> */}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex w-full justify-center py-5">
        {" "}
        {/* Pushes pagination to the bottom */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
