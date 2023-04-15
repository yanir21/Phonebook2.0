import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../lib/initSupabase";
import "./../style.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  );
}
