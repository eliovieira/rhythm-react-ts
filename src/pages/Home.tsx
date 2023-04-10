import Blog from "../components/Blog";
import styles from "./Home.module.css";

type Props = {
  authUser: any;
  beatList: any;
  getBeatList: any;
  isLoading: boolean;
};

const Home = (props: Props) => {
  //console.log(props.beatList);

  return (
    <>
      <span className="pageTitle">
        Spotlight
        <span
          className="material-symbols-outlined"
          style={{ color: "#535bf2" }}
        >
          music_note
        </span>
      </span>

      <div className={styles.blogList}>
        {props.isLoading && <span>Loading...</span>}
        {props.beatList.map((blogIndividual: any) => {
          return (
            <div key={blogIndividual.id}>
              <Blog
                {...blogIndividual}
                authUser={props.authUser}
                getBeatList={props.getBeatList}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
