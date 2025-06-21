import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

function App() {
  return (
    <>
      <div className=" bg-gray-100">
        <div className="max-w-10/12 mx-auto py-10">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
