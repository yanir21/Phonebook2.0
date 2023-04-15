import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/initSupabase";
import { useEffect, useState } from "react";
import PhoneList from "../components/PhoneList/phoneList";
import { Auth } from "@supabase/auth-ui-react";
import { ViewType } from "@supabase/auth-ui-shared";
import { authLocalization } from "../consts/consts";
import styles from "./index.module.scss";
import Navbar from "../components/Navbar/navbar";

const fetcher = ([url, token]) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Index = () => {
  const { user, session } = Auth.useUser();
  const [authView, setAuthView] = useState<ViewType>("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const View = () => {
    if (!user)
      return (
        <div className={styles.card}>
          <div>פרלמוטר טמיר ושות' - ספר טלפונים</div>
          <Auth
            supabaseClient={supabase}
            view={authView}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              style: { button: { backgroundColor: "#2c97ff" } },
            }}
            localization={authLocalization}
          />
        </div>
      );

    return user && <PhoneList />;
  };

  return (
    <div style={{ height: "calc(92vh - 8px)", direction: "rtl" }}>
      <View />
    </div>
  );
};

export default Index;
