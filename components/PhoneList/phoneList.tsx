import styles from "./phoneList.module.scss";
import { supabase } from "../../lib/initSupabase";
import { useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { AiOutlineSearch } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import "regenerator-runtime";

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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const [filter, setFilter] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className={styles.list}>
      <div className={styles["top-row"]}>
        <div className={styles["search-wrapper"]}>
          <AiOutlineSearch className={styles["search-icon"]} />
          <input
            value={filter || ""}
            onChange={(e) => {
              setFilter(e.target.value);
              onChange(e.target.value);
            }}
            className={styles["search-input"]}
            placeholder="חיפוש"
          ></input>
        </div>
        <div>
          <button
            className={styles.logout}
            onClick={() => supabase.auth.signOut()}
          >
            <BiLogOut />
            התנתק
          </button>
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
        עמוד {pageIndex + 1} מתוך {pageCount}
        <div className={styles["pagination-button"]} onClick={previousPage}>
          <GrFormNext />
          הקודם
        </div>
        <div className={styles["pagination-button"]} onClick={nextPage}>
          הבא
          <GrFormNext className={styles.reverse} />
        </div>
      </div>
    </div>
  );
};

export default PhoneList;