import React, { useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";
import getContacts from "../../pages/api/getContacts";
import { theme } from "antd";
import { IoIosContact } from "react-icons/io";
import styles from "./userModal.module.scss";

export type Contact = Awaited<ReturnType<typeof getContacts>>[0];
interface UserModalProps {
  onClose: () => void;
  contact?: Contact;
  isOpen?: boolean;
}

interface Section {
  label: string;
  field: keyof Contact;
}
const sections: Section[] = [
  { label: "תיאור", field: "description" },
  { label: "מספר", field: "number" },
  { label: "אימייל", field: "email" },
];
const UserModal = (props: UserModalProps) => {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Modal
          title="פרטי איש קשר"
          open={props.isOpen}
          onCancel={props.onClose}
          style={{ direction: "rtl" }}
          okText="סגור"
        >
          <div className={styles["top-row"]}>
            <IoIosContact className={styles["contact-icon"]} />
            <div className={styles["contact-name"]}>
              {props.contact?.name ?? "--"}
            </div>
          </div>
          {sections.map((section) => (
            <div className={styles.section}>
              <div className={styles["section-title"]}>{section.label}</div>
              <div className={styles["section-value"]}>
                {props?.contact?.[section.field] ?? "--"}
              </div>
            </div>
          ))}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default UserModal;
