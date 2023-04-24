import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

type Props = { beatList: any; authUser: any; getBeatList: any };

const Edit = (props: Props) => {
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
  const { id } = useParams();
  let navigate = useNavigate();
  const beat = props.beatList.filter((beat: any) => {
    return beat.id === id;
  });

  const beatDetails = () => {
    setTitle(beat[0].title);
    setBeatKey(beat[0].beatKey);
    setBpm(beat[0].bpm);
    setGenre(beat[0].genre);
    setLink(beat[0].url);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idString = String(id);
    const docRef = doc(db, "blogs", idString);
    const data = {
      title: title,
      beatKey: beatKey,
      bpm: bpm,
      genre: genre,
      url: link,
    };

    updateDoc(docRef, data)
      .then((docRef) => {
        console.log(`Beat ${id} was updated.`);
        navigate("/myposts");
        props.getBeatList();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (props.authUser) {
      beatDetails();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <span className="pageTitle">Edit Beat</span>
      <form onSubmit={(e) => handleEdit(e)}>
        <label>Title</label>
        <input
          maxLength={15}
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
          disabled
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
            <option key={index} value={beatKey}>
              {beatKey}
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

export default Edit;
