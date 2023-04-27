import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import getContacts from "../../pages/api/getContacts";
import { IoIosContact } from "react-icons/io";
import styles from "./contactModal.module.scss";
import { deleteContact, editContact } from "../../services/contact";

export type Contact = Awaited<ReturnType<typeof getContacts>>[0];
interface UserModalProps {
  onClose: () => void;
  reloadContacts: () => void;
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
const EditContactModal = (props: UserModalProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<Contact>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const promptError = () => {
    api["error"]({
      placement: "bottomRight",
      message: "!אופס",
      description: "הפעולה נכשלה, נסה שוב מאוחר יותר",
    });
  };

  const ModalFooter = () => (
    <div className={styles.footer}>
      {deleteMode ? (
        <div className={styles["delete-mode-buttons"]}>
          <Button onClick={setDeleteMode.bind(this, false)}>אני מתחרט</Button>
          <Button danger onClick={submitAction}>
            כן, תמחק
          </Button>
        </div>
      ) : (
        <>
          <span className={styles["left-buttons"]}>
            {edit ? (
              <>
                <span className={styles["edit-button"]} onClick={submitAction}>
                  אישור
                </span>
                <span
                  className={styles["delete-button"]}
                  onClick={setEdit.bind(this, !edit)}
                >
                  בטל עריכה
                </span>
              </>
            ) : (
              <>
                <span
                  className={styles["edit-button"]}
                  onClick={setEdit.bind(this, !edit)}
                >
                  ערוך
                </span>
                <span
                  className={styles["delete-button"]}
                  onClick={setDeleteMode.bind(this, true)}
                >
                  מחק
                </span>
              </>
            )}
          </span>
          <span className={styles["right-buttons"]}>
            <Button className={styles["close-button"]} onClick={closeAndClear}>
              סגור
            </Button>
          </span>
        </>
      )}
    </div>
  );

  const closeAndClear = () => {
    setEdit(false);
    setDeleteMode(false);
    setEditDetails(undefined);
    props.onClose();
  };

  useEffect(() => setEditDetails(edit ? props.contact : undefined), [edit]);

  const submitAction = async () => {
    try {
      deleteMode
        ? await deleteContact(props.contact.id)
        : await editContact(editDetails);
      props.reloadContacts();
    } catch (err) {
      promptError();
    } finally {
      closeAndClear();
    }
  };

  const handleFieldEdit = (field: keyof Contact, newValue: string) => {
    setEditDetails((editDetails) => ({ ...editDetails, [field]: newValue }));
  };

  const DeleteModal = () => (
    <div className={styles["delete-modal"]}>
      <div className={styles["top-row"]}>
        <IoIosContact className={styles["contact-icon"]} />
        <div className={styles["contact-name"]}>
          למחוק את {props.contact.name}?
        </div>
      </div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Modal
        title="פרטי איש קשר"
        open={props.isOpen}
        onCancel={closeAndClear}
        style={{ direction: "rtl" }}
        okText="סגור"
        cancelButtonProps={{ style: { display: "none" } }}
        footer={<ModalFooter />}
      >
        {deleteMode ? (
          <DeleteModal />
        ) : (
          <>
            <div className={styles["top-row"]}>
              <IoIosContact className={styles["contact-icon"]} />
              <div className={styles["contact-name"]}>
                {edit ? (
                  <input
                    className={styles["edit-input"]}
                    value={editDetails?.name ?? ""}
                    onChange={(event) =>
                      handleFieldEdit("name", event.target.value)
                    }
                  />
                ) : (
                  props.contact?.name ?? "--"
                )}
              </div>
            </div>
            {sections.map((section) => (
              <div className={styles.section}>
                <div className={styles["section-title"]}>{section.label}</div>
                {edit ? (
                  <div className={styles["edit-input-container"]}>
                    <input
                      className={styles["edit-input"]}
                      value={editDetails?.[section.field] ?? ""}
                      onChange={(event) =>
                        handleFieldEdit(section.field, event.target.value)
                      }
                    />
                  </div>
                ) : (
                  <div className={styles["section-value"]}>
                    {props?.contact?.[section.field]
                      ? props?.contact?.[section.field]
                      : "--"}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </Modal>
    </>
  );
};

export default EditContactModal;
