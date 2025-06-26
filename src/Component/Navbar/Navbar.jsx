
// react icons
import { IoIosArrowUp } from "react-icons/io";

import { TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/tech.png";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { context } from "../../Layout/Authentication/NewProvider";



const Navbar = () => {
  
  const {user, logOutUser} = useContext(context);
 
 
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full relative">
      {/* logo */}
      <div className="flex flex-row items-center gap-1">
        <img src={logo} alt="logo" className="w-[50px] md:w-[55px] " />
        <span className="text-2xl md:text-4xl font-bold text-pink-500">
          Tech
        </span>
      </div>

      {/* nav links */}
      <ul className="py-2 px-5 bg-white rounded-xl items-center gap-[40px] text-[0.6rem] md:text-[0.6rem] lg:text-[1.2rem] text-[#424242] md:flex hidden">
        <NavLink to="/">
          <li className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            Home
          </li>
        </NavLink>

        <NavLink to="/all_blogs">
          <li className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            All-Blog
          </li>
        </NavLink>
        <NavLink to="/add_blogs">
          <li className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            Add-Blog
          </li>
        </NavLink>
        <NavLink to="/features_blogs">
          <li className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            Wishlist
          </li>
        </NavLink>
        <NavLink to="/wishlist">
          <li className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
           Features_Blogs
          </li>
        </NavLink>
       
      </ul>

      {/* user account */}
     <div>
      {user ?  <div className="flex items-center gap-[15px]">
        <div
          className="flex items-center gap-[10px] cursor-pointer relative"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        >
          <div className="relative">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
          </div>

          <h1 className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600 sm:block hidden">
           {user.displayName}
          </h1>

          <div
            className={`${
              accountMenuOpen
                ? "translate-y-0 opacity-100 z-[1]"
                : "translate-y-[10px] opacity-0 z-[-1]"
            } bg-white w-max rounded-md absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
          >
            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
              <FiUser />
              View Profile
            </p>
            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
              <IoSettingsOutline />
              Settings
            </p>

            <div onClick={logOutUser} className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50">
                <TbLogout2 />
                Logout
              </p>
            </div>
          </div>

          <IoIosArrowUp
            className={`${
              accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
            } transition-all duration-300 dark:text-[#abc2d3] text-gray-600 sm:block hidden`}
          />
        </div>
        {/* mobile sidebar logic */}
        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242]c cursor-pointer md:hidden flex"
        />
      </div> : <div><Link to="/login"><button className="text-xl md:text-2xl lg:text-3xl font-bold p-2 bg-lime-500 rounded-md cursor-pointer hover:bg-gray-300">Login</button></Link> <Link to="/register"><button className="text-xl md:text-2xl lg:text-3xl font-bold p-2 bg-lime-500 rounded-md cursor-pointer hover:bg-gray-300">Register</button></Link></div> }

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center absolute dark:bg-slate-700 top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
      >
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <NavLink to="/">
            <li className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
              Home
            </li>
          </NavLink>
          <NavLink to="/all_blogs">
            <li className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
              All-Blog
            </li>
          </NavLink>
          <NavLink to="/add_blogs">
            <li className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
              Add-Blog
            </li>
          </NavLink>
          <NavLink to="/features_blogs">
            <li className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
              Wishlist
            </li>
          </NavLink>
          <NavLink to="/wishlist">
            <li className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
              Wishlist
            </li>
          </NavLink>


        </ul>
      </aside>
     </div>

    </nav>
  );
};

export default Navbar;
