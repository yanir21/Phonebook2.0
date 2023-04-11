import { supabase } from "../../lib/initSupabase";

const getContacts = async (req, res) =>
  (await supabase.from("contacts").select("*")).data;

export default getContacts;
