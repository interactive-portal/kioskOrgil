import React, { FC, forwardRef, useEffect, useRef } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import PrepareData from "./PrepareData";

type PropsType = {
  columns: any;
  data: any;
  tableOptions?: any;
};

export type ICheckboxProps = {
  indeterminate?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const IndeterminateCheckbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (typeof resolvedRef === "object" && resolvedRef.current) {
        resolvedRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [resolvedRef, indeterminate]);
    return (
      <div>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);
type PropsTypeFilter = {
  column: any;
  children?: React.ReactNode;
};
const DefaultColumnFilter: FC<PropsTypeFilter> = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter } = column;
  return (
    <input
      value={filterValue || ""}
      className="border w-full py-2 pl-4 "
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Хайх ..."
    />
  );
};

const Table: FC<PropsType> = ({ columns, data, tableOptions }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    state: {},
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  );

  return (
    <>
      {/* <Styles> */}
      <div className="my-8">
        <table className=" border w-full" {...getTableProps()}>
          <thead className="dark:border-gray-200 border-b py-8 bg-indigo-50">
            {headerGroups.map((headerGroup: any, index: any) => (
              <tr
                key={headerGroup?.id || index}
                className="text-sm leading-none text-gray-500 h-12  "
                {...headerGroup.getHeaderGroupProps()}
              >
                <th className="font-normal text-left px-4 break-all border  border-gray-200 w-10">
                  №{" "}
                </th>
                {headerGroup.headers.map((column: any, index: any) => (
                  <th
                    key={column?.id || index}
                    className="font-normal text-left  break-all border  border-gray-200"
                    // style={{ width: "160px" }}
                    // {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {}
                    <div
                      className={`${column.style ? `w-32` : `min-w-max px-4`} `}
                      style={column.style}
                    >
                      <p className="flex"> {column.render("Header")}</p>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* <tbody className="w-full" {...getTableBodyProps()}>
            {page.map((row: any, index: any) => {
              // console.log("cle", row);
              prepareRow(row);
              return (
                <tr
                  key={row?.id || index}
                  {...row.getRowProps()}
                  className="text-sm leading-none text-gray-800  hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="font-normal  text-left  pl-4 p-2  overflow-hidden border border-gray-200">
                    {index + 1}
                  </td>
                  {row.cells.map((cell: any, index: number) => {
                    // console.log("rendertypeStr", rendertypeStr);
                    return (
                      <td
                        key={cell?.id || index}
                        className="font-normal  text-left  pl-4 p-2  overflow-hidden border border-gray-200"
                        style={{ ...cell.column.style }}
                        {...cell.getCellProps()}
                      >
                        {<PrepareData type={cell.value} options={data} />}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </>
  );
};

export default Table;
