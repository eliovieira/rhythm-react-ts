import { Link } from "react-router-dom";
import styles from "./Home.module.css";
type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className={styles.blogList}>
      <span className="pageTitle">404</span>
                  <h1>Oops! You seem to be lost.</h1>
                               <Link to="/">Home</Link>
                         
    </div>
  );
};

export default NotFound;
