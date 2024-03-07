// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackupIcon from "@mui/icons-material/Backup";
import LanguageIcon from "@mui/icons-material/Language";
import DiamondIcon from "@mui/icons-material/Diamond";
import SettingsIcon from "@mui/icons-material/Settings";

const ComponentesProfeticos = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Caracter probado y aprobado",
      icon: (
        <BackupIcon
          className="text-white"
          style={{ fontSize: 48, marginBottom: "16px" }}
        />
      ),
      description: [
        "El caracter del profeta",
        "Detonantes del alma que gobierna",
      ],
      color: "#00b4fc",
      route: "/Caracter",
      backgroundImage: "url('https://1.bp.blogspot.com/-OFP18tbkkSo/UgUekw7BipI/AAAAAAAABFY/t01LdQugqrw/w1200-h630-p-nu/La_Biblia_Abraham_Volumen_I_El_Primer_Patriarca-Caratula.jpg')",
    },
    {
      title: "Doctrina de demonios",
      icon: (
        <LanguageIcon
          className="text-white"
          style={{ fontSize: 48, marginBottom: "16px" }}
        />
      ),
      description: [
        "La verdadera Iglesia Apóstata",
        "¿Los profetas llegaron hasta Juan?",
        "¿Fue Pablo el último Apostol?",
        "¿A solas con el Espíritu Santo?",
        "¿Son Mentoreados los Profetas?",
      ],
      color: "#005bc5",
      route: "/Doctrina",
      backgroundImage: "url('https://4.bp.blogspot.com/-lyf1SErFuVk/Wm4XsQC90OI/AAAAAAAAV9g/CNFnPrMMsJsJBw6zRFWvjmnL8pDFBzb5ACLcBGAs/s1600/JESUS%2BEXPULSA%2BDEMONIOS.jpg')",
    },
    {
      title: "Llamamiento y asignación",
      icon: (
        <DiamondIcon
          className="text-white"
          style={{ fontSize: 48, marginBottom: "16px" }}
        />
      ),
      description: [
        "Llamado y Enviados por Dios",
        "Enfocados en la asignación",
      ],
      color: "#00b4fc",
      route: "/Llamamiento",
      backgroundImage: "url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/02/the-ten-commandments-1956.jpg')",
    },
    {
      title: "Historia Profética",
      icon: (
        <SettingsIcon
          className="text-white"
          style={{ fontSize: 48, marginBottom: "16px" }}
        />
      ), // Ajuste en el tamaño del icono
      description: [
        "Escuela de Profetas en la Biblia",
        "Terminología Bíblica",
        "Hijos de los Profetas",
        "Profetas que mentoraron y entrenaron a Profetas",
      ],
      color: "#005bc5",
      route: "/Historia",
      backgroundImage: "url('https://i.etsystatic.com/28062570/r/il/038908/3194432639/il_570xN.3194432639_785n.jpg')",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex justify-center items-center h-full text-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-900 mb-8">
          Entrenándote para conquistar
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-4 sm:gap-y-6">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer flex flex-col justify-between mb-4"
                style={{
                  maxWidth: "400px",
                  height: "300px",
                  marginRight: "20px",
                  marginBottom: "20px",
                  backgroundImage: item.backgroundImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }} // Ajuste en el margen derecho y margen inferior
                onClick={() => handleCardClick(item.route)}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="p-6 text-center relative z-10">
                  {item.icon}
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {item.title}
                  </h2>
                  <div className="text-white">
                    {item.description.map((desc, i) => (
                      <p key={i}>&bull; {desc}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentesProfeticos;