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
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default UserModal;
