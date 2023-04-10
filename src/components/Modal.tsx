import styles from "./Modal.module.css";

type Props = { title: string; setOpenModal: any };

const Modal = (props: Props) => {
  return (
    <div className="overlay">
      <div className={styles.modalContainer}>
        <span>
          {" "}
          Are you sure you want to delete <h3>"{props.title}"</h3>
        </span>

        <button>Yes</button>
        <button
          onClick={(e) => {
            props.setOpenModal(false);
          }}
        >
          Nevermind
        </button>
      </div>
    </div>
  );
};

export default Modal;
