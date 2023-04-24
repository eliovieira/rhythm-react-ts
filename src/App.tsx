import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//context
import { LoginContext } from "./contexts/LoginContext";

//pages
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import NewBlog from "./pages/NewBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

function App() {
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [beatList, setBeatList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const blogsCollectionRef = collection(db, "blogs");

  const getBeatList = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(blogsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBeatList(filteredData);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBeatList();
  }, []);

  return (
    <LoginContext.Provider value={authUser}>
      <BrowserRouter>
        <nav>
          <Navbar setAuthUser={setAuthUser} />
        </nav>
        <section id="hero">
          {/* <AuthDetails authUser={authUser} setAuthUser={setAuthUser} /> */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  authUser={authUser}
                  beatList={beatList}
                  getBeatList={getBeatList}
                  isLoading={isLoading}
                />
              }
            />
            {!authUser && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
            <Route
              path="/newblog"
              element={
                <NewBlog
                  blogsCollectionRef={blogsCollectionRef}
                  getBeatList={getBeatList}
                  authUser={authUser}
                />
              }
            />
            <Route
              path="/myposts"
              element={
                <MyPosts
                  beatList={beatList}
                  authUser={authUser}
                  blogsCollectionRef={blogsCollectionRef}
                  getBeatList={getBeatList}
                />
              }
            />
            <Route
              path="/beat/:id"
              element={
                <Edit
                  beatList={beatList}
                  authUser={authUser}
                  getBeatList={getBeatList}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
        <Footer />
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
