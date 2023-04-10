import { useState } from "react";
import styles from "../pages/Home.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

type Props = {
  title: string;
  bpm: number;
  url: string;
  beatKey: string;
  genre: string;
  uid: string;
  authUser: any;
  id: any;
  getBeatList: any;
  downloadUrl: string;
};

const Blog = ({
  bpm,
  url,
  beatKey,
  genre,
  title,
  authUser,
  id,
  uid,
  getBeatList,
  downloadUrl,
}: Props) => {
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    const beatDoc = doc(db, "blogs", id);
    await deleteDoc(beatDoc);
    getBeatList();
  };

  const handleEdit = (id: string) => {
    if (id) {
      navigate(`/beat/${id}`);
    }
  };
  return (
    <div className={styles.blog}>
      <iframe
        className={styles.youtubeContainer}
        src={`https://www.youtube.com/embed/${url.slice(-11)}`}
      ></iframe>
      <div className={styles.postDetails}>
        <span className={styles.beatTitle}>{title}</span>
        <div className={styles.column}>
          <span className={styles.beatBpm}>Bpm</span>
          <span style={{ color: "white" }}>{bpm}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.beatKey}>Key</span>
          <span style={{ color: "white" }}>{beatKey}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.beatKey}>Genre</span>
          <span style={{ color: "white" }}>{genre}</span>
        </div>
        {/* <span>{props.blog.message}</span> */}
        <div className={styles.postButtons}>
          {authUser && (
            <a href={downloadUrl} target="_blank">
              <button>
                <span className="material-symbols-outlined">download</span>
              </button>
            </a>
          )}
          {authUser && authUser.uid === uid && (
            <>
              <button onClick={() => handleDelete(id)}>
                {" "}
                <span className="material-symbols-outlined">delete</span>
              </button>
              {/* <button>
                <span
                  className="material-symbols-outlined"
                  onClick={(e) => {
                    setOpenModal(true);
                    // document.body.classList.add(styles.overlay);
                  }}
                >
                  delete
                </span>
              </button>
              {openModal && <Modal title={title} setOpenModal={setOpenModal} />} */}
              <button onClick={() => handleEdit(id)}>
                <span className="material-symbols-outlined">edit</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
