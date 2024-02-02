// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Groups2,
  Home,
  RateReviewSharp,
  Menu,
  School,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

export default function NavUser() {
  const navigate = useNavigate();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };*/

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  return (
    <div className="bg-white p-4 border-b-2 border-blue-500 md:translate-x-14 md:w-3/4 lg:w-11/12 h-full">
      <div className="md:flex md:items-center">
      <div className="relative rounded-full overflow-hidden cursor-pointer w-32 h-32 md:w-20 md:h-20 md:mr-4">
          <img
            src={userData?.image || "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"}
            alt=""
            className="w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>


        <div className="text-center md:text-left md:w-1/2 mb-4 md:mb-0 flex justify-start">
          {userData && (
            <h2 className="md:text-2xl font-semibold">
              {userData.name} {userData.last_name}
            </h2>
          )}
        </div>
        <div className="md:hidden w-full">
          <button onClick={toggleMenu} className="cursor-pointer">
            <Menu />
          </button>
        </div>
        <div className="hidden md:flex md:justify-center justify-start md:w-1/2 md:space-x-4 mt-2 w-full md:-translate-x-10 mx-auto">
          <button
            onClick={() => navigate("/")}
            className="px-2 py-1 rounded md:w-32 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors"
          >
            <div className="flex items-center">
              <Home /> Inicio
            </div>
          </button>
          <button
            onClick={() => navigate("/entrenamiento")}
            className="px-2 py-1 rounded md:w-40 min-w-20 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors"
          >
            <div className="flex items-center">
              <School /> Entrenamiento
            </div>
          </button> 
          <button 
          onClick={() => navigate("/blogs")}
          className="px-2 py-1 rounded md:w-32 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors">
            <div className="flex items-center">
              <RateReviewSharp /> Mi Blog
            </div>
          </button>
          <button 
           onClick={() => navigate("/Comunidad")}
          className="px-2 py-1 rounded md:w-32 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors">
            <div className="flex items-center">
              <Groups2 /> Comunidad
            </div>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <button
            onClick={() => navigate("/")}
            className="block py-2 w-full hover-bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors"
          >
            <div className="flex items-center">
              <Home /> Inicio
            </div>
          </button>
          <button
            className="px-2 py-1 rounded md:w-32 hover-bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors"
          >
            <div className="flex items-center">
              <School /> Entrenamiento
            </div>
          </button>
          <button className="block py-2 w-full hover-bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors">
            <div className="flex items-center">
              <RateReviewSharp /> Mi Blog
            </div>
          </button>
          <button className="block py-2 w-full hover-bg-blue-500 text-blue-500 hover:text-white font-semibold transition-colors">
            <div className="flex items-center">
              <Groups2 /> Comunidad
            </div>
          </button>
        </div>
      )}
      {/*isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <img
              src={userData?.image || "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"}
              alt="Profile"
              className="max-w-screen-md cursor-pointer"
              onClick={toggleModal}
            />
          </div>
        </div>
      )*/}
    </div>
  );
}
