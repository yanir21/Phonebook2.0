import { Contact } from "../components/UserModal/editContactModal";
import { supabase } from "../lib/initSupabase";

export const getContacts = async () =>
  (await supabase.from("contacts").select("*").order("name")).data;

export const editContact = async (newContactDeatils: Contact) =>
  (
    await supabase
      .from("contacts")
      .update(newContactDeatils)
      .eq("id", newContactDeatils.id)
  ).data;

export const createContact = async (newContactDeatils: Contact) =>
  (await supabase.from("contacts").insert(newContactDeatils)).data;

export const deleteContact = async (contactId: number) =>
  (await supabase.from("contacts").delete().eq("id", contactId)).data;
