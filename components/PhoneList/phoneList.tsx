import styles from "./phoneList.module.scss";
import { supabase } from "../../lib/initSupabase";
import { useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import "regenerator-runtime";
import UserModal, { Contact } from "../UserModal/userModal";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import debounce from "lodash.debounce";

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

const Divider = () => (
  <span style={{ margin: "0 10px", color: "#3d3d3d" }}>|</span>
);

const defaultSorter = (field: keyof Contact) => {
  return (a: Contact, b: Contact) =>
    a[field].toString().localeCompare(b[field].toString());
};

const PhoneList = () => {
  const [focusedContact, setFocusedContact] = useState<Contact>();
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const data = useMemo(
    () =>
      contacts.filter((contact) =>
        Object.values(contact).some((value) => value.includes(globalFilter))
      ),
    [globalFilter]
  );

  const columns = useMemo<ColumnsType<Contact>>(
    () => [
      {
        title: "שם",
        dataIndex: "name",
        key: "name",
        sorter: { compare: defaultSorter("name") },
        showSorterTooltip: false,
        // width: "30%",
      },
      {
        title: "טלפון",
        dataIndex: "number",
        key: "number",
        sorter: { compare: defaultSorter("name") },
        showSorterTooltip: false,
      },
      {
        title: "אימייל",
        dataIndex: "email",
        key: "email",
        sorter: { compare: defaultSorter("email") },
        showSorterTooltip: false,
      },
    ],
    []
  );

  const [filterInput, setFilterInput] = useState("");

  return (
    <div className={styles.list}>
      <div className={styles["top-row"]}>
        <div className={styles["search-wrapper"]}>
          <AiOutlineSearch className={styles["search-icon"]} />
          <input
            value={filterInput || ""}
            onChange={(e) => {
              setFilterInput(e.target.value);
              debounce(() => {
                setGlobalFilter(e.target.value);
                setCurrentPage(1);
              }, 300)();
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
      <div className={styles["table-container"]}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            className: styles.pagination,
            current: currentPage,
            onChange: (pageNumber: number) => setCurrentPage(pageNumber),
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
          }}
          rowClassName={styles.row}
          rowKey={"_id"}
          className={styles.table}
          tableLayout="fixed"
          onRow={(row) => ({
            onClick: (event) => {
              setFocusedContact(row as Contact);
            },
          })}
        />
      </div>
      <UserModal
        contact={focusedContact}
        isOpen={!!focusedContact}
        onClose={() => setFocusedContact(undefined)}
      />
    </div>
  );
};

export default PhoneList;
