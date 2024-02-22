// eslint-disable-next-line no-unused-vars
import React from "react";
//import logos from '../../assets/logos'
//import whatSapp from '../../assets/logos'
import whatsapp from "../../../logos/whatsapp.ico";
import youtube from "../../../logos/youtube.ico";
import twitter from "../../../logos/twitter.ico";
import facebook from "../../../logos/facebook.ico";
import llaveblanca from "../../../logos/llaveblanca.png";
import Mapa from "../Map/Map";
import styles from "../Footer/Footer.module.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const politica = () => {
    navigate("/PoliticasPrivacidad");
  };

  return (
    <div className={styles.app_container}>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.llave}>
            <img src={llaveblanca} alt="logos" className={styles.imagen} />
          </div>
          <div className={styles.social}>
            <a href="https://www.facebook.com/llaveparalasnaciones/">
              <img
                src={facebook}
                alt="Facebook"
                className={styles.social_icon}
              />
            </a>
            <a href="https://twitter.com/Llave_Naciones?">
              <img src={twitter} alt="Twitter" className={styles.social_icon} />
            </a>
            <a href="https://www.youtube.com/@LlaveparalasNaciones">
              <img src={youtube} alt="YouTube" className={styles.social_icon} />
            </a>
            <a href="https://wa.link/59kw6g">
              <img
                src={whatsapp}
                alt="whatsapp"
                className={styles.social_icon}
              />
            </a>
          </div>
          <div className={styles.map}>
            <Mapa />
          </div>
          <div className={styles.contact_box}>
            <p className={styles.contact_title}>
              Si tienes alguna duda o sugerencia ponte en contacto con nosotros:
            </p>
            <a
              href="https://wa.link/59kw6g"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contact_button}
            >
              Contáctenos
            </a>
          </div>
        </div>
      </footer>
      <div
        className={styles.copyright}
        style={{
          textAlign: "center",
          padding: "10px",
          color: "rgba(0, 0, 0, 0.6)", // Color de texto discreto
        }}
      >
        Copyright © 2024 Llave Para Las Naciones | Funciona con Llave Para Las
        Naciones |{" "}
        <a
          href=""
          onClick={politica}
          style={{ color: "blue" }} // Cambiar color del enlace a azul
        >
          Políticas de privacidad
        </a>
      </div>
      <div className="text-xs text-center">
        <p>
          Este sitio no es parte del sitio web de Facebook Inc., Meta Inc.,
          Instagram u otras marcas registradas propiedad de Facebook Inc. y/o
          Meta Inc. <br/> Además, este sitio no está respaldado por Facebook de
          ninguna manera. FACEBOOK es una marca registrada de FACEBOOK INC. Este
          sitio no es parte del sitio web de Instagram. Además, este sitio no
          está respaldado por Facebook de ninguna manera. INSTAGRAM es una marca
          registrada de FACEBOOK, Inc. DESCARGO DE RESPONSABILIDAD: Los
          resultados (incluidos los resultados de negociación) mencionados
          anteriormente son mis resultados personales. Por favor, comprenda que
          mis resultados no son típicos. Tengo el beneficio de haber pasado por
          muchos entrenamientos, mentores, pruebas y errores durante años, y
          tengo un seguimiento establecido y la historia como resultado. La
          persona promedio que compra cualquier información de cómo hacerlo
          obtiene poco o ningún resultado. Estoy usando estas referencias solo
          para fines de ejemplo. Sus resultados variarán y dependerán de muchos
          factores ... incluidos, entre otros, sus antecedentes, experiencia y
          ética laboral. Todos los negocios conllevan riesgos y esfuerzos y
          acciones masivas y consistentes. Si no está dispuesto a aceptar eso,
          NO OBTENGA ESTA CLASE VIRTUAL. Al enviar su dirección de correo
          electrónico y número de teléfono en este sitio web, usted está
          autorizando a nuestra empresa a enviarle mensajes informativos y
          promocionales por correo electrónico, llamadas telefónicas y mensajes
          de texto. El éxito de Fundación Llave para las Naciones, los
          testimonios y otros ejemplos utilizados son resultados excepcionales y
          no típicos, y no pretenden ser ni son garantía de que usted u otros
          logren los mismos resultados. Los resultados individuales siempre
          variarán y los tuyos dependerán por completo de tu capacidad
          individual, ética de trabajo, habilidades y experiencia comercial,
          nivel de motivación, diligencia al aplicar los programas de Fundación
          Llave para las Naciones, la economía, los riesgos normales e
          imprevistos de hacer negocios y otros factores. Los programas de
          Fundación Llave para las Naciones no son responsables de sus acciones.
          Usted es el único responsable de sus propios movimientos y decisiones,
          y la evaluación y el uso de nuestros productos y servicios se deben
          basar en su propia diligencia debida. Usted acepta que los Programas
          de Fundación Llave para las Naciones no son responsables ante usted de
          ninguna manera por sus resultados en el uso de nuestros productos y
          servicios. Consulte nuestros Términos y condiciones para obtener
          nuestra divulgación completa de responsabilidad y otros términos. Si
          no acepta este aviso y estos términos, le solicitamos que abandone
          este sitio web. También se utilizan cookies para garantizar que
          obtenga la mejor experiencia en nuestro sitio web. Al hacer clic en el
          botón de registro en esta página, también acepta nuestra política de
          privacidad.
        </p>
      </div>
    </div>
  );
}

export default Footer;
