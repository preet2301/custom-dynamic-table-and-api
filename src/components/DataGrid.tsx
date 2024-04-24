// components/Table.tsx

import { useState, useMemo, useEffect } from "react";

type Column = {
  key: string;
  label: string;
  searchable?: boolean;
  filterable?: boolean;
};

type RowData = {
  [key: string]: any;
};

type Props = {
  columns: Column[];
  data: RowData[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const DynamicTable: React.FC<Props> = ({
  columns,
  data,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // Debounce function
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (debouncedSearchTerm) {
      onPageChange(1);
      filtered = filtered.filter((row) =>
        columns.some((col) => {
          if (col.searchable && row[col.key]) {
            return row[col.key]
              .toString()
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase());
          }
          return false;
        })
      );
    }

    if (statusFilter) {
      onPageChange(1);
      filtered = filtered.filter((row) => row.status === statusFilter);
    }

    filtered = filtered.slice(startIndex, endIndex);
    return filtered;
  }, [data, columns, debouncedSearchTerm, statusFilter, startIndex, endIndex]);

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={statusFilter || ""}
        onChange={(e) => setStatusFilter(e.target.value || null)}
        className="status-filter"
      >
        <option value="">All</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
        <option value="pending">Pending</option>
      </select>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="header-title">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={
            searchTerm || statusFilter
              ? endIndex >= filteredData.length
              : endIndex >= data.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
