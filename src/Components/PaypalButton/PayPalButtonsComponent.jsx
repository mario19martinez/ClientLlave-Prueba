import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress, Box, Typography } from "@mui/material";

const PayPalButtonsComponent = ({
  diplomaturaId,
  userSub,
  onPaymentSuccess,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState(null);

  // Mostramos el spinner mientras se carga el SDK de paypal
  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <CircularProgress />
      </Box>
    );
  }

  // Función para crear la orden en nuestro backend
  const createOrder = async (data, actions) => {
    try {
      setError(null);
      const response = await axios.post("/crear-orden-compra", {
        tipo: "diplomatura",
        diplomaturaId,
        userSub,
      });

      if (response.data.ok && response.data.orderID) {
        return response.data.orderID;
      } else {
        throw new Error("El backend no pudo crear la orden.");
      }
    } catch (err) {
      console.error("Error al crear la orden:", err);
      setError("No se pudo iniciar el pago. Inténtalo de nuevo.");
      toast.error("No se pudo iniciar el pago. Inténtalo de nuevo.");
      return null;
    }
  };

  // Funcion que se ejecuta cuando el usuario aprueba el pago
  const onApprove = async (data, actions) => {
    try {
      setError(null);
      const response = await axios.post("/capturar-orden-compra", {
        orderID: data.orderID, // El ID de la orden de paypal
        userSub,
        diplomaturaId,
      });

      if (response.data.ok) {
        toast.success("¡Pago completado! Seras redirigido.");
        onPaymentSuccess();
      } else {
        throw new Error(response.data.error || "La captura del pago fallo.");
      }
    } catch (error) {
      console.error("Error al capturar la orden:", error);
      setError("Hubo un problema al procesar tu pago. Contacta a soporte.");
      toast.error("Hubo un problema al procesar tu pago. Contacta a soporte.");
    }
  };

  // Funcion que se ejecuta si hay un error en el flujo de paypal
  const onError = (error) => {
    console.error("Error de PayPal:", error);
    setError("Ocurrió un error inesperado con PayPal.");
    toast.error("Ocurrió un error inesperado con PayPal.");
  };

  // Función que se ejecuta si el usuario cancela el pago
  const onCancel = (data) => {
    console.log("Pago cancelado:", data);
    toast.info("Has cancelado el pago.");
  };

  return (
    <>
      {error && (
        <Typography color="error" textAlign="center" variant="body2" my={1}>
          {error}
        </Typography>
      )}
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
        disabled={!diplomaturaId || !userSub} // Deshabilita si faltan datos
      />
    </>
  );
};

export default PayPalButtonsComponent;
