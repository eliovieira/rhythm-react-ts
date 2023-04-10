import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import styles from "./Home.module.css";

type Props = {
  beatList: any;
  authUser: any;
  blogsCollectionRef: any;
  getBeatList: any;
};

const MyPosts = (props: Props) => {
  let navigate = useNavigate();
  const filteredBlogs = props?.beatList.filter(
    (blog: any) => blog.uid === props.authUser.uid
  );

  useEffect(() => {
    if (!props.authUser) {
      navigate("*");
    }
  }, []);

  return (
    <div className="container">
      <span className="pageTitle">My Beats</span>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blogIndividual: any) => {
          return (
            <div key={blogIndividual.id}>
              <Blog
                {...blogIndividual}
                authUser={props.authUser}
                getBeatList={props.getBeatList}
              />
            </div>
          );
        })
      ) : (
        <div>No beats found.</div>
      )}
    </div>
  );
};

export default MyPosts;
