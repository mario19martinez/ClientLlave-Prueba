import { useEffect } from "react";

export default function PaypalButton({ 
  amount, 
  userSub,
  tipo, // "diplomatura" | "materia" | "clase"
  diplomaturaId = null,
  materiaId = null,
  clasesmateriaId = null,
 }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=ATp7Ngm4NNWCQnnXjrCsk8ch8z0O01Ah4WpV73aMAbU9UXwncgcxAIb4_FF6Al-Cb_v1WdOdue1ftexa";
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: async () => {
            const res = await fetch(
              "https://apillave-prueba.onrender.com/crear-orden-compra",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
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
                  tipo,
                  diplomaturaId,
                  materiaId,
                  clasesmateriaId,
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
