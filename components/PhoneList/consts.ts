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
  },
];
