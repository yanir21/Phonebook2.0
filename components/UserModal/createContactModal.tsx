import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import getContacts from "../../pages/api/getContacts";
import { IoIosContact } from "react-icons/io";
import styles from "./contactModal.module.scss";
import { createContact } from "../../services/contact";

export type Contact = Awaited<ReturnType<typeof getContacts>>[0];
interface UserModalProps {
  onClose: () => void;
  reloadContacts: () => void;
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
const CreateContactModal = (props: UserModalProps) => {
  const [formDetails, setFormDetails] = useState<Contact>();
  const [api, contextHolder] = notification.useNotification();

  const promptError = () => {
    api["error"]({
      placement: "bottomRight",
      message: "!אופס",
      description: "הייתה בעיה עם יצירת איש הקשר",
    });
  };

  const promptSuccess = () => {
    api["success"]({
      placement: "bottomRight",
      message: "!יש",
      description: "איש הקשר נוצר בהצלחה",
    });
  };

  const ModalFooter = () => (
    <div className={styles["create-footer"]}>
      <Button className={styles["cancel-button"]} onClick={closeAndClear}>
        ביטול
      </Button>
      <span className={styles["create-button"]} onClick={submitContact}>
        צור איש קשר
      </span>
    </div>
  );

  const closeAndClear = () => {
    setFormDetails(undefined);
    props.onClose();
  };

  const submitContact = async () => {
    try {
      await createContact(formDetails);
      promptSuccess();
      props.reloadContacts();
    } catch (err) {
      promptError();
    } finally {
      closeAndClear();
    }
  };

  const handleFieldEdit = (field: keyof Contact, newValue: string) => {
    setFormDetails((editDetails) => ({ ...editDetails, [field]: newValue }));
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="איש קשר חדש"
        open={props.isOpen}
        onCancel={closeAndClear}
        style={{ direction: "rtl" }}
        okButtonProps={{ style: { display: "none" } }}
        footer={<ModalFooter />}
      >
        <div className={styles["top-row"]}>
          <IoIosContact className={styles["contact-icon"]} />
          <div className={styles["contact-name"]}>
            <input
              className={styles["edit-input"]}
              value={formDetails?.name ?? ""}
              onChange={(event) => handleFieldEdit("name", event.target.value)}
            />
          </div>
        </div>
        {sections.map((section) => (
          <div className={styles.section}>
            <div className={styles["section-title"]}>{section.label}</div>
            <div className={styles["edit-input-container"]}>
              <input
                className={styles["edit-input"]}
                value={formDetails?.[section.field] ?? ""}
                onChange={(event) =>
                  handleFieldEdit(section.field, event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default CreateContactModal;
