// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserDetails as fetchUserDetailsAction,
} from "../../../Redux/features/AdminUsers/AdminUsersSlices";

function UserDetail() {
  const { identificacion } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.adminUsers.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (identificacion) {
      dispatch(fetchUserDetailsAction(identificacion));
    }
  }, [dispatch, identificacion]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return (
      <div className="text-center mt-8">Cargando detalles del usuario...</div>
    );
  }

  return (
    <div className="grid justify-items-center">
      <div className=" p-4 flex justify-center items-center translate-y-10 ">
        <Link className="bg-gray-100 text-blue-600 font-semibold px-6 py-2 border-2 border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 hover:font-bold hover:text-xl focus:outline-none focus:ring focus:border-blue-300 shadow-lg"
          to="/admin"
        >Back All Users</Link>
      </div>
      <div className=" bg-gray-100 w-96 h-auto border-double border-4 border-blue-500 rounded-md translate-y-20 ">
        <div className="container mx-auto p-12 pt-28 ">
          <div className="grid justify-items-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsModalOpen(true)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-blue-600 hover:text-blue-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <p className="text-center text-lg font-semibold mb-4">Detalles del usuario</p>
            <div>
              <p>Nombre: {user.name}</p>
              <p>Apellido: {user.last_name}</p>
              <p>Correo: {user.email}</p>
              <p>ID: {user.identificacion}</p>
              <p>País: {user.pais}</p>
              <p>Teléfono: {user.telefono}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;