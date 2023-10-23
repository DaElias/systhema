import FormCustomers from "@/components/FormCustomers/FormCustomers";
import ShowCustomers from "@/pages/ShowCustomers/ShowCustomers";
import TableComponent from "@/pages/ShowCustomers/TableComponent";
import ShowCustomersUI from "@/pages/ShowCustomersUi/ShowCustomersUi";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      {/* <TableComponent /> */}
      {/* <FormCustomers /> */}
      <ShowCustomersUI />
      {/* <ShowCustomers /> */}
    </div>
  )
}
