// src/components/PurchaseFailed.jsx
export default function PurchaseFailed() {
  return (
    <div className="p-4 rounded-xl border border-red-400 bg-red-100 text-red-700 shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold">Compra Fallida</h2>
      <p>Ocurrió un problema al procesar el pago. Intenta nuevamente.</p>
    </div>
  );
}
