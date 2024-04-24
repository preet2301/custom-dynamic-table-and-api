import DynamicTable from "@/components/DataGrid";
import data from "../tabledata/data.json";
import { useState } from "react";


export default function Home() {

  const columns = [
    { key: "name", label: "Name", searchable: true },
    { key: "age", label: "Age" },
    { key: "status", label: "Status", filterable: true },
  ];
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="header-title">Dynamic Table</h1>
      <DynamicTable columns={columns} data={data} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
    </div>
  );
}
