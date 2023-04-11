import styles from "./phoneList.module.scss";
import { supabase } from "../../lib/initSupabase";
import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
const a = {
  name: "Eliahu Hanavi",
  number: "0534265854",
  email: "eli@gmail.com",
};
const b = {
  name: "Bibi Netanyahu",
  number: "0534265854",
  email: "bibi@gm@gm",
};
const contacts = [
  a,
  a,
  b,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  a,
  b,
  b,
  a,
  a,
  a,
];

const EMPTY_VALUE = "--";

const PhoneList = () => {
  const data = useMemo(() => contacts, []);

  const columns = useMemo(
    () => [
      {
        Header: "שם",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "טלפון",
        accessor: "number",
      },
      {
        Header: "אימייל",
        accessor: "email",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination);

  return (
    <div className={styles.list}>
      <div className={styles["top-row"]}>
        <div>חיפוש</div>
        <div>
          <button onClick={() => supabase.auth.signOut()}>התנתק</button>
        </div>
      </div>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div className={styles["pagination-button"]} onClick={previousPage}>
          {"< הקודם"}
        </div>
        <div className={styles["pagination-button"]} onClick={nextPage}>
          {"הבא > "}
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
