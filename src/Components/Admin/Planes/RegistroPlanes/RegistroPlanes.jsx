import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Tooltip from "@mui/material/Tooltip";

function RegistroPlanes() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    description: "",
    status: "",
    transactionDate: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("/purchases");
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

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurchases.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

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

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 translate-x-6">
        Registros de compra
      </h1>
      <div className="overflow-x-auto">
        <div className="mb-6 translate-x-6">
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrar</h2> */}
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
            <Tooltip
              title="Reiniciar Filtros"
              arrow
              placement="right"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -6],
                      },
                    },
                  ],
                },
              }}
            >
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
        <table className="min-w-full bg-white  rounded-lg shadow-lg">
          <thead className="">
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
              <tr
                key={purchase.id}
                //className="transition-transform transform hover:scale-105 hover:bg-gray-100"
              >
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
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"‹"}
          nextLabel={"›"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredPurchases.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={
            "px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"
          }
          pageLinkClassName={"block"}
          previousClassName={
            "px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"
          }
          previousLinkClassName={"block"}
          nextClassName={
            "px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"
          }
          nextLinkClassName={"block"}
          breakClassName={
            "px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"
          }
          breakLinkClassName={"block"}
          activeClassName={"bg-blue-500 text-white border-blue-500"}
        />
      </div>
    </div>
  );
}

export default RegistroPlanes;
