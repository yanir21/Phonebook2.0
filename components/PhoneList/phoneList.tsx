import styles from "./phoneList.module.scss";
import { supabase } from "../../lib/initSupabase";
import { useMemo, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import EditContactModal, { Contact } from "../UserModal/editContactModal";
import { FloatButton, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import debounce from "lodash.debounce";
import { getContacts } from "../../services/contact";
import { tableHeaders } from "./consts";
import CreateContactModal from "../UserModal/createContactModal";
import useMediaQuery from "use-media-antd-query";

const PhoneList = () => {
  const [focusedContact, setFocusedContact] = useState<Contact>();
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreatingContact, setIsCreatingContact] = useState<boolean>(false);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);
  const mediaQuery = useMediaQuery();

  const loadContacts = async () => {
    try {
      const loadedContacts = await getContacts();
      setContacts(loadedContacts);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [reloadFlag]);

  const reloadContacts = () => {
    setReloadFlag((flag) => !flag);
  };

  const data = useMemo(
    () =>
      contacts.filter((contact) =>
        Object.values(contact).some((value) =>
          value?.toString().includes(globalFilter)
        )
      ),
    [globalFilter, contacts]
  );

  const columns = useMemo<ColumnsType<Contact>>(() => tableHeaders, []);

  const emptyText = useMemo(
    () =>
      globalFilter
        ? "אין תוצאות התואמות לחיפוש"
        : "לא ניתן לטעון אנשי קשר. בדוק האם יש לך הרשאות מתאימות",
    [globalFilter]
  );

  const [filterInput, setFilterInput] = useState("");

  const isMobile = useMemo<boolean>(() => mediaQuery === "xs", [mediaQuery]);

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
        {!isMobile && (
          <div>
            <button
              className={styles.logout}
              onClick={() => supabase.auth.signOut()}
            >
              <BiLogOut />
              התנתק
            </button>
          </div>
        )}
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
            pageSizeOptions: [6, 8, 10, 20],
            hideOnSinglePage: true,
            defaultPageSize: 6,
          }}
          rowClassName={styles.row}
          rowKey={"_id"}
          className={styles.table}
          tableLayout="fixed"
          showHeader={!isMobile}
          onRow={(row) => ({
            onClick: (event) => {
              setFocusedContact(row as Contact);
            },
          })}
          loading={isLoading}
          locale={{ emptyText: emptyText }}
        />
      </div>
      <EditContactModal
        contact={focusedContact}
        isOpen={!!focusedContact}
        onClose={() => setFocusedContact(undefined)}
        reloadContacts={reloadContacts}
      />
      <CreateContactModal
        isOpen={isCreatingContact}
        onClose={() => setIsCreatingContact(false)}
        reloadContacts={reloadContacts}
      />
      <FloatButton
        icon={<BsPersonFillAdd />}
        type="primary"
        tooltip="איש קשר חדש"
        style={{ width: "60px", height: "60px" }}
        onClick={() => setIsCreatingContact(true)}
      />
    </div>
  );
};

export default PhoneList;
