import { useLocation } from "react-router-dom";

const PaymentResponse = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get("status");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4">Resultado del Pago</h2>
        <div className="text-lg">
          {status === "completed" ? (
            <div className="text-green-600">
              <svg
                className="h-16 w-16 mx-auto mb-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Pago realizado con éxito
            </div>
          ) : (
            <div className="text-red-600">
              <svg
                className="h-16 w-16 mx-auto mb-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Error en el pago
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResponse;
