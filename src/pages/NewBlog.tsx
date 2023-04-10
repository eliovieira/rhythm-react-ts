import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { getAdditionalUserInfo } from "firebase/auth";

type Props = { blogsCollectionRef: any; getBeatList: any; authUser: any };

const NewBlog = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [beatKey, setBeatKey] = useState<string>("");
  const [bpm, setBpm] = useState<number>(0);
  const [genre, setGenre] = useState<string>("Hip Hop");
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const genreList = ["Hip Hop", "Pop", "R&B", "Rock", "Reggae", "Country"];
  const keyList = [
    "A minor",
    "A major",
    "A# minor",
    "A# major",
    "B minor",
    "B major",
    "C minor",
    "C major",
    "C# minor",
    "C# major",
    "D minor",
    "D major",
    "D# minor",
    "D# major",
    "E minor",
    "E major",
    "F minor",
    "F major",
    "F# minor",
    "F# major",
    "G minor",
    "G major",
    "G# minor",
    "G# major",
  ];

  let navigate = useNavigate();

  //console.log(props.authUser);
  const createNewBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(props.blogsCollectionRef, {
      title: title,
      bpm: bpm,
      beatKey: beatKey,
      genre: genre,
      uid: props.authUser.uid,
      url: link,
      uploadDate: new Date(),
    })
      .then((blog) => {
        console.log(blog);
        setTitle("");
        setBpm(0);
        setBeatKey("");
        setGenre("");
        setLink("");
        props.getBeatList();
        navigate("/myposts");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  useEffect(() => {
    if (!props.authUser) {
      navigate("*");
    }
  }, []);

  return (
    <>
      <span className="pageTitle">New Beat</span>
      <form onSubmit={(e) => createNewBlog(e)}>
        <label>Title</label>
        <input
          placeholder="Insert beat's name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Youtube Link</label>
        <input
          placeholder="(ex. https://youtu.be/n1nsCOS6reo)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <label>Genre</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          {genreList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Key</label>
        <select onChange={(e) => setBeatKey(e.target.value)} required>
          {keyList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Bpm</label>
        <input
          type="number"
          placeholder="Insert BPM"
          value={bpm}
          onChange={(e) => {
            setBpm(Number(e.target.value));
          }}
          min="1"
          max="200"
          required
        />
        <button>Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default NewBlog;
