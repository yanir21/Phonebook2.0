const inputLabels = {
  email_label: "כתובת מייל",
  email_input_placeholder: "",
  password_label: "סיסמה",
  password_input_placeholder: "",
};
export const authLocalization = {
  variables: {
    sign_in: {
      ...inputLabels,
      button_label: "התחבר",
      link_text: "כבר יש לך חשבון?",
    },
    forgotten_password: { link_text: "שכחת את הסיסמה?" },
    sign_up: {
      ...inputLabels,
      link_text: "עדיין אין לך חשבון?",
    },
  },
};
