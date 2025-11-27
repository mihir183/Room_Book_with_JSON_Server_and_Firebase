import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Routing from "./Layout.jsx";
import { Suspense } from "react";
import Loading from "./Component/Loading.jsx";

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
      
    </>
  );
};

export default App;
