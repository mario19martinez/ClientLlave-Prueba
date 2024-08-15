
const DonacionBoton = () => {
  const handleClick = () => {
    document.getElementById("frm_ePaycoCheckoutOpen").submit();
  };

  return (
    <div style={styles.container}>
      <form
        id="frm_ePaycoCheckoutOpen"
        name="frm_ePaycoCheckoutOpen"
        method="POST"
        action="https://secure.payco.co/checkoutopen.php"
        style={styles.form}
      >
        <input name="p_cust_id_cliente" type="hidden" value="1381112" />
        <input name="p_key" type="hidden" value="75046b37a9cec5d5171d31bfdf52369f902dc794" />
        <input name="p_id_factura" type="hidden" value="" />
        <input name="p_description" type="hidden" value="Donacion" />
        <input name="p_detalle" type="hidden" value="" />
        <input name="p_referencia" type="hidden" value="0001" />
        <input name="p_test_request" type="hidden" value="false" />
        <input name="p_url_respuesta" type="hidden" value="https://www.llaveparalasnaciones.com/" />
        <input name="p_url_confirmacion" type="hidden" value="" />
        <input type="image" id="imagen" src="https://multimedia.epayco.co/dashboard/btns/btn10.png" alt="Donar" />
        <input type="hidden" id="idboton" name="idboton" value="66522" />
      </form>
      <button style={styles.customButton} onClick={handleClick}>
        Donación
      </button>
    </div>
  );
};

// Estilos para el boton flotante
const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  form: {
    display: 'none',
  },
  customButton: {
    backgroundColor: '#007bff', // Color de fondo del botón
    color: '#fff', // Color del texto
    border: 'none',
    borderRadius: '10%',
    width: '90px', // Ajusta el tamaño según tu preferencia
    height: '40px', // Ajusta el tamaño según tu preferencia
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Sombra del botón
    transition: 'background-color 0.3s ease, transform 0.3s ease', // Transición de color y transformación
    animation: 'pulse 2s infinite', // Aplicar animación de pulso
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  '@keyframes hover': {
    '0%': {
      backgroundColor: '#007bff', // Color de fondo original
    },
    '100%': {
      backgroundColor: '#0056b3', // Color de fondo al pasar el ratón
    },
  },
};

export default DonacionBoton;
