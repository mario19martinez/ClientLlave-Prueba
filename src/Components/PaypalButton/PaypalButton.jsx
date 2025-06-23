import { useEffect } from "react";

export default function PaypalButton({ amout, userSub, diplomaturaId }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID";
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: async () => {
            const res = await fetch(
              "https://apillave-prueba.onrender.com/crear-orden-compra",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amout }),
              }
            );
            const data = await res.json();
            return data.orderID;
          },
          onApprove: async (data) => {
            const res = await fetch(
              "https://apillave-prueba.onrender.com/capturar-orden-compra",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderID: data.orderID,
                  userSub,
                  diplomaturaId,
                }),
              }
            );
            const result = await res.json();
            console.log("Resultado:", result);
            alert("¡Compra completada!");
          },
        })
        .render("#paypal-button-container");
    });

    document.body.appendChild(script);
  }, []);

  return <div id="paypal-button-container"></div>;
}
