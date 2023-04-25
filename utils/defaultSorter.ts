import { Contact } from "../components/UserModal/editContactModal";

export const defaultSorter = (field: keyof Contact) => {
  return (a: Contact, b: Contact) =>
    a[field].toString().localeCompare(b[field].toString());
};
