import { useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "../App.module.css";

function GadgetTable({
  gadgets,
  selectedId,
  onSelect,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "gadgetName",
        header: "Gadget Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "manufacturer",
        header: "Manufacturer",
      },
      {
        accessorKey: "healthRating",
        header: "Health Rating",
      },
      {
        accessorKey: "techBrandName",
        header: "Tech Brand",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
    ],
    []
  );

  const table = useReactTable({
    data: gadgets,
    columns,

    initialState: {
      pagination: {
        pageSize: 3,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
            <th key={header.id}> 
            {header.isPlaceholder
            ? null
            : flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}
            </th>
          ))}
            </tr>
          ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>No gadgets registered.</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => onSelect(row.original.id) }
                  className={selectedId === row.original.id
                    ? styles.selectedRow
                    : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        
        <div className={styles.pageInfo}>Page{" "}
          <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}of{" "}<strong>{Math.max(table.getPageCount(), 1)}</strong>
        </div>

        <div className={styles.paginationButtons}>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>

          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
        </div>
      </div>
    </>
  );
}

export default GadgetTable;