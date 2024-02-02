// eslint-disable-next-line no-unused-vars
import React from "react";
//import logos from '../../assets/logos'
//import whatSapp from '../../assets/logos'
import whatsapp from '../../../logos/whatsapp.ico'
import youtube from '../../../logos/youtube.ico'
import twitter from '../../../logos/twitter.ico'
import facebook from '../../../logos/facebook.ico'
import llaveblanca from '../../../logos/llaveblanca.png'
import Mapa from "../Map/Map";
import styles from "../Footer/Footer.module.css"

function Footer() {
  
  return (
    <div className={styles.app_container}>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.llave}>
            <img
              src={llaveblanca}
              alt="logos"
              className={styles.imagen}
            />
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
              <img
                src={twitter}
                alt="Twitter"
                className={styles.social_icon}
              />
            </a>
            <a href="https://www.youtube.com/@LlaveparalasNaciones">
              <img
                src={youtube}
                alt="YouTube"
                className={styles.social_icon}
              />
            </a>
            <a href="https://api.whatsapp.com/send?phone=573126023309">
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
              href="https://api.whatsapp.com/send?phone=573126023309"
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
        style={{ textAlign: "center", padding: "10px" }}
      >
        Copyright © 2023 Llave Para Las Naciones | Funciona con Llave Para Las
        Naciones
      </div>
    </div>
  );
}

export default Footer;
