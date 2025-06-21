import { Outlet } from "react-router-dom"
import Navbar from "../Component/Navbar/Navbar"
import Footer from "../Component/Footer/Footer"



function App() {
  

  return (
    <>
    <div className="container mx-auto px-2 my-10">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

export default App
