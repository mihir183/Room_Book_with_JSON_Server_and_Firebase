import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Routing from "./Layout.jsx";
import { Suspense } from "react";
import Loading from "./Component/Loading.jsx";
import { ToastContainer,Bounce } from "react-toastify";

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            {Routing.map((ele) => (
              <Route path={ele.path} element={<ele.element />}></Route>
            ))}
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
