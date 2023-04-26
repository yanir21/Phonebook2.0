import { ColumnsType } from "antd/es/table";
import { Contact } from "../UserModal/editContactModal";
import { defaultSorter } from "../../utils/defaultSorter";

export const tableHeaders: ColumnsType<Contact> = [
  {
    title: "שם",
    dataIndex: "name",
    key: "name",
    sorter: { compare: defaultSorter("name") },
    showSorterTooltip: false,
    responsive: ["sm"],
  },
  {
    title: "טלפון",
    dataIndex: "number",
    key: "number",
    sorter: { compare: defaultSorter("name") },
    showSorterTooltip: false,
    responsive: ["sm"],
  },
  {
    title: "אימייל",
    dataIndex: "email",
    key: "email",
    sorter: { compare: defaultSorter("email") },
    showSorterTooltip: false,
    responsive: ["sm"],
  },
  {
    title: "נוצר ב",
    dataIndex: "created_at",
    key: "created-at",
    sorter: { compare: defaultSorter("created_at") },
    showSorterTooltip: false,
    render: (date: Date) => {
      const dateObj = new Date(date);
      return `${dateObj.toLocaleDateString()}, ${dateObj
        .toLocaleTimeString()
        .slice(0, 5)}`;
    },

    responsive: ["sm"],
  },
  {
    title: "Contacts",
    render: (_, record: Contact) => record.name,
    responsive: ["xs"],
  },
];
