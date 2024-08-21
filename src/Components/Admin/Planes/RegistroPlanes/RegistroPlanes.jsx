import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function RegistroPlanes() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    description: "",
    status: "",
    transactionDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("/purchases");
        console.log(response.data);
        const purchasesWithUserInfo = response.data.map((purchase) => ({
          ...purchase,
          customerName: purchase.user.name,
          customerLastname: purchase.user.last_name,
        }));
        setPurchases(purchasesWithUserInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const statuses = ["completed", "failed"];
  const descriptions = Array.from(new Set(purchases.map((p) => p.description)));
  const transactionDates = Array.from(
    new Set(
      purchases.map((p) => new Date(p.transactionDate).toLocaleDateString())
    )
  );

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesDescription = filters.description
      ? purchase.description === filters.description
      : true;
    const matchesStatus = filters.status
      ? purchase.status === filters.status
      : true;
    const matchesDate = filters.transactionDate
      ? new Date(purchase.transactionDate).toLocaleDateString() ===
        filters.transactionDate
      : true;
  
    return matchesDescription && matchesStatus && matchesDate;
  });
  
  console.log(filteredPurchases); // Verifica los datos filtrados
  
  const indexOfLastItem = currentPage * itemsPerPage; // Corrige el índice
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurchases.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  
  console.log(currentItems); // Verifica los datos paginados

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPurchases.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setFilters({
      description: "",
      status: "",
      transactionDate: "",
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-500 mt-4">Cargando Historial de ventas...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  //   return (
  //     <div className="fixed inset-0 flex justify-center items-center">
  //     <div className="text-center">
  //       <p className="text-gray-500 mt-4">Cargando Historial de ventas...</p>
  //       <CircularProgress />
  //     </div>
  //   </div>
  // );
  // }

  // if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Registros de compra
      </h1>
      <div className="overflow-x-auto">
        <div className="mb-6">
          <form onSubmit={(e) => e.preventDefault()} className="flex space-x-4">
            <select
              value={filters.description}
              onChange={(e) =>
                setFilters({ ...filters, description: e.target.value })
              }
              className="p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Todas las descripciones</option>
              {descriptions.map((desc, index) => (
                <option key={index} value={desc}>
                  {desc}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Todos los estados</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filters.transactionDate}
              onChange={(e) =>
                setFilters({ ...filters, transactionDate: e.target.value })
              }
              className="p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Todas las fechas</option>
              {transactionDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <Tooltip title="Reiniciar Filtros" arrow placement="right">
              <button
                type="button"
                onClick={resetFilters}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <RestartAltIcon fontSize="medium" />
              </button>
            </Tooltip>
          </form>
        </div>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                RefPayco
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Currency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Bank Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Customer Lastname
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Transaction Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.refPayco}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.bankName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {purchase.customerLastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      purchase.status === "completed"
                        ? "bg-green-400 text-white"
                        : purchase.status === "failed"
                        ? "bg-red-400 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {new Date(purchase.transactionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() =>
                setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } px-3 py-1 border border-gray-300 font-medium text-sm rounded-md`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage === pageNumbers.length
                    ? pageNumbers.length
                    : currentPage + 1
                )
              }
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default RegistroPlanes;
